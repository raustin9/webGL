/**
 * This class is the shader program that we use to render objects
 */
class ShaderProgram {
  vertexSource = null;   // This is the source of the vertex shader program
  fragmentSource = null; // THis is the source of the fragment shader program
  vertexShader = null;   // This is the webGL vertex shader we attach to the program
  fragmentShader = null; // This is the webGL fragment shader we attach to the program
  program = null;        // This is the webGl program that we use

  /**
   * 
   * @param {String} vertSource the source code of the vertex shader
   * @param {String} fragSource the source code of the fragment shader
   */
  constructor(
    vertSource,
    fragSource
  ) {
    // We have passed in the source code for the vertex and fragment shaders
    // We need to compile them
    this.vertexSource   = vertSource;
    this.fragmentSource = fragSource;

    this.vertexShader   = this.generateShader(gl.VERTEX_SHADER, vertSource);
    this.fragmentShader = this.generateShader(gl.FRAGMENT_SHADER, fragSource);

    // Create the shader program
    this.program = gl.createProgram();

    // Attach the compiled shader functions to the program
    gl.attachShader(this.program, this.vertexShader);
    gl.attachShader(this.program, this.fragmentShader);

    // Link the program and ensure that the inputs and outputs of 
    // the shaders match
    gl.linkProgram(this.program);

    // Check if there was an error linking it and print it to console
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.program);
      throw `Could not link shader program: ${info}`;
    }
  }

  /**
   * 
   * @param {GLenu,} type either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
   * @param {String} source the source code of the shader
   * @returns {WebGLShader} the compiled shader
   */
  generateShader(
    type,
    source
  ) {
    // Create a webGL shader with the specified type
    const shader = gl.createShader(type);

    // Send the source code of the shader to the webGL shader
    gl.shaderSource(shader, source);

    // Compile the shader
    gl.compileShader(shader);

    // Ensure that the shader compiled correctly
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      let whichShader = (type == gl.VERTEX_SHADER ? 'vertext' : 'frag');
      alert(`An error occurred compiling the ${whichShader} shader: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * getAttributeLocations gets a dictionary of the specified attribute locations in a program
   * @param {Array.<String>} attributeNames A list of attribute names to get from a shader program
   */
  getAttributeLocations(attributeNames) {
    let attributeLocations = {}
    attributeNames.forEach(attributeName => {
      // getAttribLocation takes a program and string that corresponds with an attribute
      // In the simple.vert file, an example attribute is 'attribute vec3 aVertexPosition;'
      // It is identified by the string 'aVertexPosition'
      attributeLocations[attributeName] = gl.getAttribLocation(this.program, attributeName);
    });
    return attributeLocations;
  }

  /**
   * getUniformLocations returns the uniform locations for a specified list of uniforms
   * @param {Array.<String>} uniformNames A list of uniform names to find locations of inside of a shader 
   */
  getUniformLocations(uniformNames) {
    let uniformLocations = {}
    // getUniformLocation works pretty much the same as the get attrib location.
    uniformNames.forEach(uniformName => {
      uniformLocations[uniformName] = gl.getUniformLocation(this.program, uniformName);
    });
    return uniformLocations;
  }
}