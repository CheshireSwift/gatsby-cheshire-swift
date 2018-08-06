import * as React from 'react';
import { mat4 } from 'gl-matrix';
import * as _ from 'lodash';

import { ProgramInfo, Pos } from './wolfenstein';
import { RenderedProps, loadTexture } from './canvas';

let enemyVAO: WebGLVertexArrayObjectOES | null = null;
const texture: { [key: string]: WebGLTexture } = {};

export enum EnemyType {
  Charizard,
  Fireball,
}

export function initEnemy(
  gl: WebGLRenderingContext,
  vaoExt: OES_vertex_array_object,
  programInfo: ProgramInfo,
) {
  enemyVAO = vaoExt.createVertexArrayOES();
  vaoExt.bindVertexArrayOES(enemyVAO);
  texture[EnemyType.Charizard] = loadTexture(gl, '/assets/charizard.png');
  texture[EnemyType.Fireball] = loadTexture(gl, '/assets/fireball.png');

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = _.flatten([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const uvCoords = _.flatten([[0, 0], [1, 0], [1, 1], [0, 1]]);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvCoords), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [0, 1, 2, 0, 2, 3];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(
      programInfo.attribLocs.vertexPos,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocs.vertexPos);
  }

  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.vertexAttribPointer(
      programInfo.attribLocs.vertexUV,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocs.vertexUV);
  }
}

interface EnemyProps {
  type: EnemyType;
  position: Pos;
  facing: number;
  spawnEnemy: (props: EnemyProps) => void;
}

export class Enemy extends React.Component<EnemyProps & RenderedProps, {}> {
  constructor(props: EnemyProps & RenderedProps) {
    super(props);
  }

  render(): false {
    const gl = this.props.gl;

    const modelMatrix = mat4.create();

    mat4.translate(modelMatrix, modelMatrix, [
      this.props.position.x,
      this.props.position.y,
      0.0,
    ]);

    gl.uniformMatrix4fv(this.props.modelMatrix, false, modelMatrix);

    this.props.vaoExt.bindVertexArrayOES(enemyVAO!);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture[this.props.type]);
    gl.uniform1i(this.props.sampler, 0);
    gl.uniform1i(this.props.billboard, 1);

    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    return false;
  }
}
