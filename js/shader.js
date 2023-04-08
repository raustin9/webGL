class Shader {
  /* MEMBER VARIABLES */
  vertexSource = null;
  fragmentSource = null;

  vertexShader = null;
  fragmentShader = null;

  program = null;

  /**
   * CONSTRUCTOR
   * @param {String} vSource The source of the vert shader
   * @param {String} fSource The source of the frag shader
   */
  constructor(vSource, fSource) {
    this.vertexSource = vSource;
    this.fragmentSource = fSource;

    this.vertexShader = this.getShader(gl.VERTEX_SHADER, vSource);
    this.fragmentShader = this.getShader(gl.FRAGMENT_SHADER, fSource);

    this.program = gl.createProgram();

    // Attach the shaders to the program
    gl.attachShader(this.program, this.vertexShader);
    gl.attachShader(this.program, this.fragmentShader);

    // Link the program
    gl.linkProgram(this.program);

    // Check for error when linking
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.program);
      throw new Error(`Could not link shader program: ${info}`);
    }
  }

  /**
   * @param {GLenum} type   The type of shader [vertex or fragment]
   * @param {String} source source of the shader program
   * @returns {WebGLShader} The compiled shader
   */
  getShader(type, source) {
    const shader = gl.createShader(type);

    // Put the source of the shader into the shader object
    // And compile the shader
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Check to make sure shader was successfully compiled
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let whichShader = (type == gl.VERTEX_SHADER ? 'vertex' : 'fragment');
      console.log(`Error when compiling the ${whichShader} shader: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }

    // return the shader if compiled successfully
    return shader;
  }

  getAttributeLocations(attributeNames) {
    let attributeLocations = {};
    attributeNames.forEach(attributeName => {
      attributeLocations[attributeName] = gl.getAttribLocation(this.program, attributeName);
    });
    return attributeLocations;
  }

  getUniformLocations(uniformNames) {
    let uniformLocations = {};
    uniformNames.forEach(uniformName => {
      uniformLocations[uniformName] = gl.getUniformLocation(this.program, uniformName);
    });
    return uniformLocations;
  }
}