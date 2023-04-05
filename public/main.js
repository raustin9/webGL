const canvas = document.getElementById("main-canvas");
const gl = canvas.getContext('webgl');

// make sure that gl is not null
if (!gl) {
  throw new Error("WebGL is not supported on this browser");
}



/*
vertexData = [...]

create buffer on gpu 
load vertex data into that buffer 

create vertex shader 
create fragment shader 
create program 
attach shaders to program 

draw */

// VERTEX DATA
const vertexData = [
  0, 1, 0,
  1, -1, 0,
  -1, -1, 0
];

const colorData = [
  1, 0, 0, // V1.color
  0, 1, 0, // V2.color
  0, 0, 1, // V3.color
];

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

  attribute vec3 aPosition;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    gl_Position = vec4(aPosition, 1);
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
gl.drawArrays(gl.TRIANGLES, 0, 3);