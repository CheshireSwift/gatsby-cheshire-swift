import * as React from 'react';
import { mat4 } from 'gl-matrix';

import { Pos, RenderedProps } from './wolfenstein';
import { getTexture } from './canvas';

interface FireProps {
  initialPos: Pos;
  direction: number;
  time: number;
}

export class Fireball extends React.Component<FireProps & RenderedProps, {}> {
  initTime: number;

  constructor(props: FireProps & RenderedProps) {
    super(props);
    console.log('construct');
    this.initTime = props.time;
  }

  render(): false {
    console.log('Fireball');
    const dist = (this.props.time - this.initTime) / 500;
    const x = this.props.initialPos.x + Math.cos(this.props.direction) * dist;
    const y = this.props.initialPos.y + Math.sin(this.props.direction) * dist;

    const gl = this.props.gl;

    const modelMatrix = mat4.create();

    console.log(x, y);
    mat4.translate(modelMatrix, modelMatrix, [x, y, 0.0]);

    gl.uniformMatrix4fv(
      this.props.programInfo.uniformLocs.modelMatrix,
      false,
      modelMatrix,
    );

    this.props.vaoExt.bindVertexArrayOES(this.props.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, getTexture(gl, '/assets/fireball.png'));
    gl.uniform1i(this.props.programInfo.uniformLocs.sampler, 0);
    gl.uniform1i(this.props.programInfo.uniformLocs.billboard, 1);

    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    return false;
  }
}
