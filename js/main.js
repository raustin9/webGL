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
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
    // X, Y           R, G, B
    0.0, 0.5, 0.0,    1.0, 1.0, 0.0,
    -0.5, -0.5, 0.0,  0.7, 0.0, 1.0,
    0.5, -0.5, 0.0,   0.1, 1.0, 0.6
  ];

  let boxVertices = 
	[ // X, Y, Z         U, V
		// Top
		-1.0, 1.0, -1.0,   0, 0,
		-1.0, 1.0, 1.0,    0, 1,
		1.0, 1.0, 1.0,     1, 1,
		1.0, 1.0, -1.0,    1, 0,

		// Left
		-1.0, 1.0, 1.0,    0, 0,
		-1.0, -1.0, 1.0,   1, 0,
		-1.0, -1.0, -1.0,  1, 1,
		-1.0, 1.0, -1.0,   0, 1,

		// Right
		1.0, 1.0, 1.0,    1, 1,
		1.0, -1.0, 1.0,   0, 1,
		1.0, -1.0, -1.0,  0, 0,
		1.0, 1.0, -1.0,   1, 0,

		// Front
		1.0, 1.0, 1.0,    1, 1,
		1.0, -1.0, 1.0,    1, 0,
		-1.0, -1.0, 1.0,    0, 0,
		-1.0, 1.0, 1.0,    0, 1,

		// Back
		1.0, 1.0, -1.0,    0, 0,
		1.0, -1.0, -1.0,    0, 1,
		-1.0, -1.0, -1.0,    1, 1,
		-1.0, 1.0, -1.0,    1, 0,

		// Bottom
		-1.0, -1.0, -1.0,   1, 1,
		-1.0, -1.0, 1.0,    1, 0,
		1.0, -1.0, 1.0,     0, 0,
		1.0, -1.0, -1.0,    0, 1,
	];

  let boxIndices = [
    // Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
  ]

  let boxVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

  let boxBufferIndexObject = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxBufferIndexObject);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

  let positionAttribLocation = gl.getAttribLocation(program, 'aVertexPosition');
  let textureCoordAttribLocation = gl.getAttribLocation(program, 'aVertexTextureCoord');
  gl.vertexAttribPointer(
    positionAttribLocation,             // attribute location
    3,                                  // number of elements per attribute
    gl.FLOAT,                           // type of element
    gl.FALSE,                           // normalized
    5 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    0                                   // offset
  );
  gl.vertexAttribPointer(
    textureCoordAttribLocation,             // attribute location
    2,                                  // number of elements per attribute
    gl.FLOAT,                           // type of element
    gl.FALSE,                           // normalized
    5 * Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT, // offset from beginning of a single vertex
  );

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(textureCoordAttribLocation);

  // CREATE TEXTURE
  let boxTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, boxTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById("crate-img"));

  gl.bindTexture(gl.TEXTURE_2D, null);


  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);

  // UNIFORMS
  let worldMatrixUniform = gl.getUniformLocation(program, 'uWorldMatrix');
  let viewMatrixUniform = gl.getUniformLocation(program, 'uViewMatrix');
  let projectionMatrixUniform = gl.getUniformLocation(program, 'uProjectionMatrix');

  let projectionMatrix = glMatrix.mat4.create();
  let worldMatrix = glMatrix.mat4.create();
  let viewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(
    viewMatrix,
    [0,0,-8],
    [0,0,0],
    [0,1,0]
  );
  glMatrix.mat4.perspective(
    projectionMatrix, 
    45 * Math.PI/180,           // vertical field of view
    canvas.width/canvas.height, // aspect ratio
    1e-4,                       // near cull disctance
    1e4,                        // far cull distance
  );

  gl.uniformMatrix4fv(worldMatrixUniform, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(viewMatrixUniform, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(projectionMatrixUniform, gl.FALSE, projectionMatrix);

  // // MAIN RENDER LOOP
  let angle = 0;
  let identity = glMatrix.mat4.create();
  function renderScene() {
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;

    glMatrix.mat4.rotate(
      worldMatrix,
      identity,
      angle,
      [0,1,0]
    );
    glMatrix.mat4.rotate(
      worldMatrix,
      worldMatrix,
      angle/2,
      [0,0,1]
    );
    gl.uniformMatrix4fv(worldMatrixUniform, gl.FALSE, worldMatrix);

    gl.clearColor(0.75,0.85,0.80,1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(renderScene);
  }
  requestAnimationFrame(renderScene);
  
  
  
  
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