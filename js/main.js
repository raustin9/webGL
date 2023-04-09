let gl = null;
let program = null;
let globalTime = null;
let vShaderName = 'basic.vert'; // The name of the file of the vertex shader
let fShaderName = 'basic.frag'; // The name of the file of the fragment shader
let vertexShader = null;        // temp global var for the vert shader
let fragmentShader = null;      // temp global var for the frag shader
let vertSource = null;             // temp global var of name of the vertex shader resource
let fragSource = null;          // temp global var of name of the fragment shader resource

async function InitDemo() {
  let canvas = document.getElementById("main-canvas");
  gl = canvas.getContext('webgl2');

  gl.clearColor(0.75, 0.85, 0.8, 1);
  gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPHT_BUFFER_BIT);

  // Get our vertex and fragment shaders
  vertSource = await loadNetworkResourceAsText(`resources/shaders/vertex/${vShaderName}`);
  fragSource = await loadNetworkResourceAsText(`resources/shaders/fragment/${fShaderName}`);
  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertSource);
  gl.shaderSource(fragmentShader, fragSource);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compiling vertex shader", gl.getShaderInfoLog(vertexShader));
    return;
  }
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compiling vertex shader", gl.getShaderInfoLog(fragmentShader));
    return;
  }

  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("ERROR linking program", gl.getProgramInfoLog(program));
    return;
  }

  // ONLY KEEP FOR TESTING
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program", gl.getProgramInfoLog(program));
    return;
  }

  // Create buffers on GPU
  let triangleVertices = [
    // X, Y      R, G, B
    0.0, 0.5,    1.0, 1.0, 0.0,
    -0.5, -0.5,  0.7, 0.0, 1.0,
    0.5, -0.5,   0.1, 1.0, 0.6
  ];

  let triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  let positionAttribLocation = gl.getAttribLocation(program, 'aVertexPosition');
  let colorAttribLocation = gl.getAttribLocation(program, 'aVertexColor');
  gl.vertexAttribPointer(
    positionAttribLocation,             // attribute location
    2,                                  // number of elements per attribute
    gl.FLOAT,                           // type of element
    gl.FALSE,                           // normalized
    5 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    0                                   // offset
  );
  gl.vertexAttribPointer(
    colorAttribLocation,             // attribute location
    3,                                  // number of elements per attribute
    gl.FLOAT,                           // type of element
    gl.FALSE,                           // normalized
    5 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    2 * Float32Array.BYTES_PER_ELEMENT, // offset from beginning of a single vertex
  );

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  // // MAIN RENDER LOOP
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

/**
 * This function loads the necessary resources
 * This includes the necessary models to render and the shaders
 */
async function Setup() {
  // let objData = await loadNetworkResourceAsText('resources/models/sphere.obj');
  vertSource = await loadNetworkResourceAsText(`resources/shaders/vertex/${vShaderName}`);
  fragSource = await loadNetworkResourceAsText(`resources/shaders/fragment/${fShaderName}`);

  // for now, we will load these into global vars
  // but we will change it to be per object soon
}