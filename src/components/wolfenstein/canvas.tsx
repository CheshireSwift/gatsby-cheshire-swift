import * as React from 'react';
import { Level } from './level';
import { Wolfenstein } from './wolfenstein';

interface GameState {
  isPaused: boolean;
  time: number;
}

export enum Button {
  Left = 0,
  Middle = 1,
  Right = 2,
}

export interface RenderedProps {
  gl: WebGLRenderingContext;
  vaoExt: OES_vertex_array_object;
  modelMatrix: WebGLUniformLocation;
  sampler: WebGLUniformLocation;
}

interface CanvasProps {
  width: number;
  height: number;
}

class Game extends React.Component<CanvasProps, GameState> {
  canvas: { canvas: HTMLCanvasElement | null } = { canvas: null };
  gl: { gl: WebGLRenderingContext | null } = { gl: null };
  mousePos = { x: 0, y: 0 };
  keys = new Map<string, boolean>();
  mouseButtons = new Map<Button, boolean>();

  constructor(props: CanvasProps) {
    super(props);
    this.init = this.init.bind(this);
    this.focus = this.focus.bind(this);
    this.onMouseEvent = this.onMouseEvent.bind(this);
    this.onKeyboardEvent = this.onKeyboardEvent.bind(this);
    this.state = {
      isPaused: true,
      time: performance.now(),
    };
  }

  init(canvas: HTMLCanvasElement) {
    this.canvas.canvas = canvas;
    const gl = canvas ? canvas.getContext('webgl') : null;
    if (
      !gl ||
      !gl.getSupportedExtensions()!.includes('OES_vertex_array_object')
    ) {
      alert('Unable to init WebGL');
      return;
    }
    this.gl.gl = gl;
  }

  focus() {
    if (!this.canvas.canvas) {
      return;
    }
    this.canvas.canvas.requestPointerLock();
    document.addEventListener(
      'pointerlockchange',
      () => {
        if (!this.canvas.canvas) {
          return;
        }
        if (document.pointerLockElement === this.canvas.canvas) {
          this.setState({
            isPaused: false,
          });
          document.addEventListener('mousemove', this.onMouseEvent, false);
          document.addEventListener('mousedown', this.onMouseEvent, false);
          document.addEventListener('mouseup', this.onMouseEvent, false);
          document.addEventListener('keydown', this.onKeyboardEvent, false);
          document.addEventListener('keyup', this.onKeyboardEvent, false);
        } else {
          this.setState({
            isPaused: true,
          });
          this.mouseButtons.clear();
          this.keys.clear();
          document.removeEventListener('mousemove', this.onMouseEvent, false);
          document.removeEventListener('mousedown', this.onMouseEvent, false);
          document.removeEventListener('mouseup', this.onMouseEvent, false);
          document.removeEventListener('keydown', this.onKeyboardEvent, false);
          document.removeEventListener('keyup', this.onKeyboardEvent, false);
        }
      },
      false,
    );
  }

  onMouseEvent(e: MouseEvent) {
    e.preventDefault();
    switch (e.type) {
      case 'mousemove':
        this.mousePos.x += e.movementX + 1;
        this.mousePos.y += e.movementY + 1;
        break;
      case 'mousedown':
        this.mouseButtons.set(e.button, true);
        break;
      case 'mouseup':
        this.mouseButtons.set(e.button, false);
        break;
    }
  }

  onKeyboardEvent(e: KeyboardEvent) {
    e.preventDefault();
    this.keys.set(e.key, e.type === 'keydown');
  }

  shouldComponentUpdate() {
    return this.canvas.canvas === null;
  }

  componentWillUnmount() {
    this.mouseButtons.clear();
    this.keys.clear();
    this.setState({
      isPaused: true,
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <canvas
          ref={this.init}
          width={this.props.width}
          height={this.props.height}
          style={{ border: '2px solid black', display: 'inline-block' }}
          onClick={this.focus}
        />
        <Wolfenstein
          gl={this.gl}
          mousePos={this.mousePos}
          keys={this.keys}
          buttons={this.mouseButtons}
        />
      </div>
    );
  }
}

export function loadTexture(gl: WebGLRenderingContext, url: string) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([255, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );

  const image = new Image();
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  };
  image.src = url;

  return texture;
}

export default Game;
