import * as React from 'react';
import { mat4 } from 'gl-matrix';
import * as _ from 'lodash';

import { Button } from './canvas';
import { Wall, initWall } from './wall';
import { Enemy, initEnemy, EnemyType } from './enemy';

export interface Pos {
  x: number;
  y: number;
}

enum Cell {
  Wall,
  Floor,
}

interface WolfProps {
  gl: { gl: WebGLRenderingContext | null };
  mousePos: Pos;
  keys: Map<string, boolean>;
  buttons: Map<Button, boolean>;
}

interface WolfState {
  shouldRun: boolean;
  time: number;
  walls: Cell[][];
}

export interface ProgramInfo {
  program: WebGLProgram;
  attribLocs: {
    vertexPos: number;
    vertexUV: number;
  };
  uniformLocs: {
    projMatrix: WebGLUniformLocation;
    viewMatrix: WebGLUniformLocation;
    modelMatrix: WebGLUniformLocation;
    sampler: WebGLUniformLocation;
    billboard: WebGLUniformLocation;
  };
}

export class Wolfenstein extends React.Component<WolfProps, WolfState> {
  oldGl: WebGLRenderingContext | null = null;
  programInfo: ProgramInfo | null = null;
  player: Pos = { x: 2, y: 2 };

  constructor(props: WolfProps) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      shouldRun: false,
      time: performance.now(),
      walls: _.times(20, i =>
        _.times(20, j => {
          if (i === 0 || i === 19 || j === 0 || j === 19) {
            return Cell.Wall;
          } else {
            return Cell.Floor;
          }
        }),
      ),
    };
    window.requestAnimationFrame(this.tick);
  }

  init(gl: WebGLRenderingContext) {
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aVertexUV;

      uniform mat4 uModelMatrix;
      uniform mat4 uViewMatrix;
      uniform mat4 uProjMatrix;
      uniform bool uBillboard;

      varying highp vec2 vUV;

      void main(void) {
        mat4 mvMatrix = uViewMatrix * uModelMatrix;
        if (uBillboard) {
          mvMatrix[0] = vec4(1, 0, 0, mvMatrix[0][3]);
          mvMatrix[1] = vec4(0, 1, 0, mvMatrix[1][3]);
          mvMatrix[2] = vec4(0, 0, 1, mvMatrix[2][3]);
        }
        gl_Position = uProjMatrix * mvMatrix * aVertexPosition;
        vUV = aVertexUV;
      }
    `;

    const fsSource = `
      varying highp vec2 vUV;

      uniform sampler2D uSampler;

      void main(void) {
        gl_FragColor = texture2D(uSampler, vUV);
      }
    `;

    const program = this.initShaderProgram(gl, vsSource, fsSource)!;

    this.programInfo = {
      program,
      attribLocs: {
        vertexPos: gl.getAttribLocation(program, 'aVertexPosition'),
        vertexUV: gl.getAttribLocation(program, 'aVertexUV'),
      },
      uniformLocs: {
        projMatrix: gl.getUniformLocation(program, 'uProjMatrix')!,
        viewMatrix: gl.getUniformLocation(program, 'uViewMatrix')!,
        modelMatrix: gl.getUniformLocation(program, 'uModelMatrix')!,
        sampler: gl.getUniformLocation(program, 'uSampler')!,
        billboard: gl.getUniformLocation(program, 'uBillboard'),
      },
    };

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const vaoExt = gl.getExtension('OES_vertex_array_object')!;
    initWall(gl, vaoExt, this.programInfo);
    initEnemy(gl, vaoExt, this.programInfo);
    gl.useProgram(this.programInfo.program);

    gl.enable(gl.CULL_FACE);
    const fieldOfView = Math.PI / 4;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    gl.uniformMatrix4fv(
      this.programInfo.uniformLocs.projMatrix,
      false,
      projectionMatrix,
    );
    gl.uniform1i(this.programInfo.uniformLocs.billboard, 0);
  }

  initShaderProgram(
    gl: WebGLRenderingContext,
    vsSource: string,
    fsSource: string,
  ): WebGLProgram | null {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        'Unable to initialize the shader program: ' +
          gl.getProgramInfoLog(shaderProgram),
      );
      return null;
    }

    return shaderProgram;
  }

  loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        'An error occurred compiling the shaders: ' +
          gl.getShaderInfoLog(shader),
      );
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  tick(time: number) {
    const sin = Math.sin(this.props.mousePos.x / 1000);
    const cos = Math.cos(this.props.mousePos.x / 1000);
    const newPos = { x: this.player.x, y: this.player.y };
    if (this.props.keys.get('w')) {
      newPos.x += (cos * (time - this.state.time)) / 100;
      newPos.y -= (sin * (time - this.state.time)) / 100;
    }
    if (this.props.keys.get('s')) {
      newPos.x -= (cos * (time - this.state.time)) / 100;
      newPos.y += (sin * (time - this.state.time)) / 100;
    }
    const dist = 0.2;
    const dirs = [
      [1, 0],
      [0, 1],
      [1, 1],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [-1, 1],
      [1, -1],
    ];
    const collision = dirs
      .map(([dirX, dirY]) => ({
        x: newPos.x + dirX * dist,
        y: newPos.y + dirY * dist,
      }))
      .some(
        pos =>
          this.state.walls[Math.floor(pos.x)][Math.floor(pos.y)] !== Cell.Floor,
      );
    if (!collision) {
      this.player.x = newPos.x;
      this.player.y = newPos.y;
    }
    this.setState({ time });
  }

  render() {
    window.requestAnimationFrame(this.tick);

    if (!this.props.gl.gl) {
      return null;
    }
    const gl: WebGLRenderingContext = this.props.gl.gl!;
    if (gl !== this.oldGl) {
      this.init(gl);
      this.oldGl = gl;
    }
    const vaoExt = gl.getExtension('OES_vertex_array_object');

    // tslint:disable-next-line:no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const viewMatrix = mat4.create();

    mat4.lookAt(viewMatrix, [0, 0, 0], [1, 0, 0], [0, 0, 1]);
    mat4.rotateZ(viewMatrix, viewMatrix, this.props.mousePos.x / 1000);
    mat4.translate(viewMatrix, viewMatrix, [
      -this.player.x,
      -this.player.y,
      -0.5,
    ]);

    gl.uniformMatrix4fv(
      this.programInfo.uniformLocs.viewMatrix,
      false,
      viewMatrix,
    );

    return (
      <div>
        {_.flatMap(this.state.walls, (walls, x) => {
          return _.map(walls, (wall, y) => {
            if (wall !== Cell.Floor) {
              return (
                <Wall
                  key={[x, y].toString()}
                  gl={gl}
                  vaoExt={vaoExt}
                  modelMatrix={this.programInfo.uniformLocs.modelMatrix}
                  sampler={this.programInfo.uniformLocs.sampler}
                  billboard={this.programInfo.uniformLocs.billboard}
                  position={{ x, y }}
                />
              );
            }
          });
        })}
        <Enemy
          gl={gl}
          vaoExt={vaoExt}
          modelMatrix={this.programInfo.uniformLocs.modelMatrix}
          sampler={this.programInfo.uniformLocs.sampler}
          billboard={this.programInfo.uniformLocs.billboard}
          type={EnemyType.Charizard}
          facing={0}
          position={{ x: 5, y: 5 }}
        />
        <p>{this.state.time}</p>
        <p>{this.props.mousePos.x}</p>
        <p>{JSON.stringify(this.props.keys)}</p>
        <p>{JSON.stringify(this.props.buttons)}</p>
      </div>
    );
  }
}
