import * as _ from 'lodash';

import { ProgramInfo } from './wolfenstein';

export function getCubeVAO(
  gl: WebGLRenderingContext,
  vaoExt: OES_vertex_array_object,
  programInfo: ProgramInfo,
): WebGLVertexArrayObjectOES {
  const vao = vaoExt.createVertexArrayOES();
  vaoExt.bindVertexArrayOES(vao);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = _.flatten([
    // Front
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 1],
    [0, 0, 1],
    // Back
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
    [1, 1, 1],
    // Top
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
    // Bottom
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
    // Right
    [1, 0, 0],
    [1, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
    // Left
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 1],
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const faceUVCoords = _.flatten([[0, 1], [1, 1], [1, 0], [0, 0]]);

  const uvCoords: number[] = _.flatten(_.times(6, _.constant(faceUVCoords)));

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvCoords), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = _.flatten([
    [0, 1, 2, 0, 2, 3], // front
    [4, 5, 6, 4, 6, 7], // back
    [8, 9, 10, 8, 10, 11], // top
    [12, 13, 14, 12, 14, 15], // bottom
    [16, 17, 18, 16, 18, 19], // right
    [20, 21, 22, 20, 22, 23], // left
  ]);

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

  return vao;
}

export function getBillboardVAO(
  gl: WebGLRenderingContext,
  vaoExt: OES_vertex_array_object,
  programInfo: ProgramInfo,
): WebGLVertexArrayObjectOES {
  const vao = vaoExt.createVertexArrayOES();
  vaoExt.bindVertexArrayOES(vao);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = _.flatten([
    [-0.5, 0, 0],
    [0.5, 0, 0],
    [0.5, 1, 0],
    [-0.5, 1, 0],
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const uvCoords = _.flatten([[0, 1], [1, 1], [1, 0], [0, 0]]);

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

  return vao;
}
