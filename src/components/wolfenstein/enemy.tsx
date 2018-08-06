import * as React from 'react';
import { mat4 } from 'gl-matrix';

import { Pos, RenderedProps } from './wolfenstein';
import { getTexture } from './canvas';

interface EnemyProps {
  position: Pos;
  time: number;
  spawnFireball: (fireball: Pos) => void;
}

export class Enemy extends React.Component<
  EnemyProps & RenderedProps,
  { lastTime: number }
> {
  constructor(props: EnemyProps & RenderedProps) {
    super(props);
    this.state = {
      lastTime: props.time,
    };
    props.spawnFireball({ x: 10, y: 10 });
  }

  render(): false {
    const gl = this.props.gl;

    const modelMatrix = mat4.create();

    mat4.translate(modelMatrix, modelMatrix, [
      this.props.position.x,
      this.props.position.y,
      0.0,
    ]);

    gl.uniformMatrix4fv(
      this.props.programInfo.uniformLocs.modelMatrix,
      false,
      modelMatrix,
    );

    this.props.vaoExt.bindVertexArrayOES(this.props.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, getTexture(gl, '/assets/charizard.png'));
    gl.uniform1i(this.props.programInfo.uniformLocs.sampler, 0);
    gl.uniform1i(this.props.programInfo.uniformLocs.billboard, 1);

    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    return false;
  }
}
