import * as React from 'react';
import { mat4 } from 'gl-matrix';
import * as _ from 'lodash';

import { ProgramInfo, RenderedProps, Pos } from './wolfenstein';
import { getTexture } from './canvas';

interface WallProps {
  position: Pos;
}

export class Wall extends React.Component<RenderedProps & WallProps, {}> {
  constructor(props: RenderedProps & WallProps) {
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

    gl.uniformMatrix4fv(
      this.props.programInfo.uniformLocs.modelMatrix,
      false,
      modelMatrix,
    );

    this.props.vaoExt.bindVertexArrayOES(this.props.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, getTexture(gl, '/assets/wall.png'));
    gl.uniform1i(this.props.programInfo.uniformLocs.sampler, 0);
    gl.uniform1i(this.props.programInfo.uniformLocs.billboard, 0);

    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    return false;
  }
}

export default Wall;
