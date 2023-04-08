class Drawable {
  // MEMBER VARIABLES
  shader = null;
  vertexBuffers = {};
  attributeLocations = null;
  uniformLocations = null;
  elementArrayBuffer = null;
  verticesCount = null;

  /**
   * this function should be defined for every drawable
   */
  uniformSetup = () => {
    if (!this.uniformSetupWarned) {
      console.warn(`A drawable being drawn does not have the uniform setup function`);
      this.uniformSetupWarned = true;
    }
  };

  /**
   * 
   * @param {ShaderProgram} shader The shader that we want to draw this drawable with
   * @param {*} bufferMap  
   * @param {*} elementBuffer 
   * @param {*} verticesCount 
   */
  constructor(
    shader,
    bufferMap,
    elementBuffer = null,
    verticesCount = null
  ) {
    this.shader = shader;

    if (!elementBuffer && !verticesCount) {
      throw  `You must specify an element Index Buffer or vertices count`;
    }

    const attributeNames = Object.keys(bufferMap);
    const attributeLocations = shader.getAttributeLocations(attributeNames);

    for (const attributeName in bufferMap) {
      const location = attributeLocations[attributeName];
      this.vertexBuffers[location] = bufferMap[attributeName];
    }

    if (elementBuffer) {
      this.elementArrayBuffer = elementBuffer;
    } else {
      this.verticesCount = verticesCount;
    }
  }

  /**
   * Attempts to draw the defined drawable using the inde buffer or specified amount of vertices
   */
  draw() {
    if (this.elementArrayBuffer && !this.verticesCount) {
      this.elementArrayBuffer.bindAndEnable();
    }

    // Ensure that the attribute buffers are bound
    // If the same drawable is drawn consecutively then those do not need to be rebound
    for (const bufferLocation in this.vertexBuffers) {
      this.vertexBuffers[bufferLocation].bindAndEnable(bufferLocation);
    }

    gl.useProgram(this.shader.program);
    this.uniformSetup();

    // if not using an index array draw as many vertices as loaded in the buffer
    if (this.verticesCount) {
      gl.drawArrays(gl.TRIANGLES, 0, this.verticesCount);
      return;
    }

    // Otherwise we need to draw with elements
    const offset = 0;
    gl.drawElements(
      gl.TRIANGLES,
      this.elementArrayBuffer.count,
      this.elementArrayBuffer.type,
      offset
    );
  }
}