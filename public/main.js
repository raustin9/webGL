const canvas = document.getElementById("main-canvas");
const gl = canvas.getContext('webgl');

// make sure that gl is not null
if (!gl) {
  throw new Error("WebGL is not supported on this browser");
}

// VERTEX DATA
const vertexData = [
  // 0, 1, 0,
  // 1, -1, 0,
  // -1, -1, 0

  // Front
  0.5, 0.5, 0.5,
  0.5, -.5, 0.5,
  -.5, 0.5, 0.5,
  -.5, 0.5, 0.5,
  0.5, -.5, 0.5,
  -.5, -.5, 0.5,

  // Left
  -.5, 0.5, 0.5,
  -.5, -.5, 0.5,
  -.5, 0.5, -.5,
  -.5, 0.5, -.5,
  -.5, -.5, 0.5,
  -.5, -.5, -.5,

  // Back
  -.5, 0.5, -.5,
  -.5, -.5, -.5,
  0.5, 0.5, -.5,
  0.5, 0.5, -.5,
  -.5, -.5, -.5,
  0.5, -.5, -.5,

  // Right
  0.5, 0.5, -.5,
  0.5, -.5, -.5,
  0.5, 0.5, 0.5,
  0.5, 0.5, 0.5,
  0.5, -.5, 0.5,
  0.5, -.5, -.5,

  // Top
  0.5, 0.5, 0.5,
  0.5, 0.5, -.5,
  -.5, 0.5, 0.5,
  -.5, 0.5, 0.5,
  0.5, 0.5, -.5,
  -.5, 0.5, -.5,

  // Bottom
  0.5, -.5, 0.5,
  0.5, -.5, -.5,
  -.5, -.5, 0.5,
  -.5, -.5, 0.5,
  0.5, -.5, -.5,
  -.5, -.5, -.5,
];

// const colorData = [
//   1, 0, 0, // V1.color
//   0, 1, 0, // V2.color
//   0, 0, 1, // V3.color
// ];

function randomColor() {
  return [Math.random(),Math.random(),Math.random()];
}

let colorData = [];
for (let face = 0; face < 6; face++) {
  let faceColor = randomColor();
  for (let vertex = 0; vertex < 6; vertex++) {
    colorData.push(...faceColor);
  }
}

// const colorData = [
//   ...randomColor(),
//   ...randomColor(),
//   ...randomColor(),
// ];

// CREATE BUFFERS
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

// Create the vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
  precision mediump float;

  uniform mat4 uMatrix;
  attribute vec3 aPosition;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    gl_Position = uMatrix * vec4(aPosition, 1);
  }
`);
gl.compileShader(vertexShader);

// create the fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
  precision mediump float;

  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1);
  }
`);
gl.compileShader(fragmentShader);

// create program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// create vertex attributes
const positionLocation = gl.getAttribLocation(program, `aPosition`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `aColor`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.enable(gl.DEPTH_TEST);

const uniformLocations = {
  matrix: gl.getUniformLocation(program, `uMatrix`)
};

const modelMatrix = glMatrix.mat4.create();
const viewMatrix = glMatrix.mat4.create();
const modelViewMatrix = glMatrix.mat4.create();
const projectionMatrix = glMatrix.mat4.create();
const modelViewProjectionMatrix = glMatrix.mat4.create();

glMatrix.mat4.perspective(
  projectionMatrix, 
  75 * Math.PI/180,           // vertical field of view
  canvas.width/canvas.height, // aspect ratio
  1e-4,                       // near cull disctance
  1e4,                        // far cull distance
);

glMatrix.mat4.translate(modelMatrix, modelMatrix, [-1.5, 0, -2]);
// glMatrix.mat4.scale(modelMatrix, modelMatrix, [0.5, 0.5, 0.5]);

glMatrix.mat4.translate(viewMatrix, viewMatrix, [-3, 0, 1]);
glMatrix.mat4.invert(viewMatrix, viewMatrix);

function animate() {
  requestAnimationFrame(animate);
  // glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, Math.PI/2/70);
  // glMatrix.mat4.rotateX(modelMatrix, modelMatrix, Math.PI/2/70);

  glMatrix.mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);
  glMatrix.mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelViewMatrix);

  gl.uniformMatrix4fv(uniformLocations.matrix, false, modelViewProjectionMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
}

animate();