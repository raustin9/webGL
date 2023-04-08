// const canvas = document.getElementById("main-canvas");
// const gl = canvas.getContext('webgl');

// // make sure that gl is not null
// if (!gl) {
//   throw new Error("WebGL is not supported on this browser");
// }

// // VERTEX DATA
// const vertexData = [
//   // 0, 1, 0,
//   // 1, -1, 0,
//   // -1, -1, 0

//   // Front
//   0.5, 0.5, 0.5,
//   0.5, -.5, 0.5,
//   -.5, 0.5, 0.5,
//   -.5, 0.5, 0.5,
//   0.5, -.5, 0.5,
//   -.5, -.5, 0.5,

//   // Left
//   -.5, 0.5, 0.5,
//   -.5, -.5, 0.5,
//   -.5, 0.5, -.5,
//   -.5, 0.5, -.5,
//   -.5, -.5, 0.5,
//   -.5, -.5, -.5,

//   // Back
//   -.5, 0.5, -.5,
//   -.5, -.5, -.5,
//   0.5, 0.5, -.5,
//   0.5, 0.5, -.5,
//   -.5, -.5, -.5,
//   0.5, -.5, -.5,

//   // Right
//   0.5, 0.5, -.5,
//   0.5, -.5, -.5,
//   0.5, 0.5, 0.5,
//   0.5, 0.5, 0.5,
//   0.5, -.5, 0.5,
//   0.5, -.5, -.5,

//   // Top
//   0.5, 0.5, 0.5,
//   0.5, 0.5, -.5,
//   -.5, 0.5, 0.5,
//   -.5, 0.5, 0.5,
//   0.5, 0.5, -.5,
//   -.5, 0.5, -.5,

//   // Bottom
//   0.5, -.5, 0.5,
//   0.5, -.5, -.5,
//   -.5, -.5, 0.5,
//   -.5, -.5, 0.5,
//   0.5, -.5, -.5,
//   -.5, -.5, -.5,
// ];

// // const colorData = [
// //   1, 0, 0, // V1.color
// //   0, 1, 0, // V2.color
// //   0, 0, 1, // V3.color
// // ];

// function randomColor() {
//   return [Math.random(),Math.random(),Math.random()];
// }

// let colorData = [];
// for (let face = 0; face < 6; face++) {
//   let faceColor = randomColor();
//   for (let vertex = 0; vertex < 6; vertex++) {
//     colorData.push(...faceColor);
//   }
// }

// // const colorData = [
// //   ...randomColor(),
// //   ...randomColor(),
// //   ...randomColor(),
// // ];

// // CREATE BUFFERS
// const positionBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// const colorBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

// Create the vertex shader
// const vertexShader = gl.createShader(gl.VERTEX_SHADER);
// gl.shaderSource(vertexShader, `
//   precision mediump float;

//   uniform mat4 uMatrix;
//   attribute vec3 aPosition;
//   attribute vec3 aColor;
//   varying vec3 vColor;

//   void main() {
//     vColor = aColor;
//     gl_Position = uMatrix * vec4(aPosition, 1);
//   }
// `);
// gl.compileShader(vertexShader);

// // create the fragment shader
// const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// gl.shaderSource(fragmentShader, `
  // precision mediump float;

  // varying vec3 vColor;

  // void main() {
  //   gl_FragColor = vec4(vColor, 1);
  // }
// `);
// gl.compileShader(fragmentShader);

// // create program
// const program = gl.createProgram();
// gl.attachShader(program, vertexShader);
// gl.attachShader(program, fragmentShader);
// gl.linkProgram(program);

// // create vertex attributes
// const positionLocation = gl.getAttribLocation(program, `aPosition`);
// gl.enableVertexAttribArray(positionLocation);
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

// const colorLocation = gl.getAttribLocation(program, `aColor`);
// gl.enableVertexAttribArray(colorLocation);
// gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
// gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

// gl.useProgram(program);
// gl.enable(gl.DEPTH_TEST);

// const uniformLocations = {
//   matrix: gl.getUniformLocation(program, `uMatrix`)
// };

// const modelMatrix = glMatrix.mat4.create();
// const viewMatrix = glMatrix.mat4.create();
// const modelViewMatrix = glMatrix.mat4.create();
// const projectionMatrix = glMatrix.mat4.create();
// const modelViewProjectionMatrix = glMatrix.mat4.create();

// glMatrix.mat4.perspective(
//   projectionMatrix, 
//   75 * Math.PI/180,           // vertical field of view
//   canvas.width/canvas.height, // aspect ratio
//   1e-4,                       // near cull disctance
//   1e4,                        // far cull distance
// );

// glMatrix.mat4.translate(modelMatrix, modelMatrix, [-1.5, 0, -2]);
// // glMatrix.mat4.scale(modelMatrix, modelMatrix, [0.5, 0.5, 0.5]);

// glMatrix.mat4.translate(viewMatrix, viewMatrix, [0, -1, 2]);
// glMatrix.mat4.invert(viewMatrix, viewMatrix);

// function animate() {
//   requestAnimationFrame(animate);
//   // glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, Math.PI/2/70);
//   // glMatrix.mat4.rotateX(modelMatrix, modelMatrix, Math.PI/2/70);

//   glMatrix.mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);
//   glMatrix.mat4.multiply(modelViewProjectionMatrix, projectionMatrix, modelViewMatrix);

//   gl.uniformMatrix4fv(uniformLocations.matrix, false, modelViewProjectionMatrix);
//   gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
// }

// animate();

/* GL CONTEXT */
let gl = null;
let projectionMatrix = null;
let modelViewMatrix = null;
let myShader = null;
let globalTime = 0.0;
// let shaderType = "basic";
let myDrawable = null;
let myDrawableInitialized = null;
let parsedData = null;

function main() {
  // Grab canvas and create webgl context
  const canvas = document.getElementById("main-canvas");
  gl = canvas.getContext('webgl2');

  if (!gl) {
    console.log("webgl is not supported");
    return;
  }

  // Set the clear color
  gl.clearColor(0.7, 0.7, 0.7, 1.0);

  // Clear the depth buffer
  gl.clearDepth(1.0);

  // Enable the depth function to draw nearer rather than farther things
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.DEPTH_TEST);
  
  // Repeatedly draw the scene
  let then = 0.0;
  function renderScene(now) {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    drawScene(deltaTime);
    requestAnimationFrame(renderScene);
  }
  requestAnimationFrame(renderScene);

  // Set up camera
  const FOV = degreesToRadians(60);
  const aspectRatio = gl.canvas.width / gl.canvas.height;
  const nearCull = 0.1;
  const farCull = 100.0;
  projectionMatrix = glMatrix.mat4.create();
  glMatrix.mat4.perspective(
    projectionMatrix,
    FOV,         // frame of view 
    aspectRatio, // aspect ratio
    nearCull,    // near culling distance
    farCull,     // far culling distance
  )

  setup();

  setupUI();
}

/**
 * Used to get resoures and set up the scene
 */
async function setup() {
  // let objData = await loadNetworkResourceAsText('resources/models/sphere.obj');
  // let vertSource = await loadNetworkResourceAsText(`resources/shaders/vertex/bary300.vert`);
  // let fragSource = await loadNetworkResourceAsText('resources/shaders/fragment/bary300.frag');
  // initializeObject(vertSource, fragSource, objData);
  let objData = await loadNetworkResourceAsText('resources/models/sphere.obj');
  let vertSource = await loadNetworkResourceAsText('resources/shaders/vertex/bary300.vert');
  let fragSource = await loadNetworkResourceAsText('resources/shaders/fragment/bary300.frag');
  initializeObject(vertSource, fragSource, objData);
}


/**
 * 
 * @param {Number} deltaTime time used to repeatedly increment the gobal time 
 */
function drawScene(deltaTime) {
  globalTime += deltaTime;

  // Clear the color buffer with the specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let modelMatrix = glMatrix.mat4.create();
  let objectWorldPos = [0.0, 0.0, -6.0];
  let rotationAxis = [1.0, 0.0, 0.0];
  glMatrix.mat4.translate(modelMatrix, modelMatrix, objectWorldPos);
  glMatrix.mat4.rotate(
    modelMatrix,
    modelMatrix,
    globalTime,
    rotationAxis
  );

  // Create the view matrix
  let viewMatrix = glMatrix.mat4.create();

  // Get the camera position values
  // let cameraFocus = [
  //   document.getElementById("lookXVal").value, 
  //   document.getElementById("lookYVal").value, 
  //   document.getElementById("lookZVal").value
  // ];
  // let cameraPosition = [
  //   document.getElementById("camXVal").value, 
  //   document.getElementById("camYVal").value, 
  //   document.getElementById("camZVal").value
  // ];
  let cameraPosition = [0.0, 0.0, Math.sin(globalTime) * 4.0];
  let cameraFocus = [0.0, 0.0, -6.0];

  glMatrix.mat4.lookAt(
    viewMatrix,
    cameraPosition,
    cameraFocus,
    [0.0, 1.0, 0.0]
  );

  modelViewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.mul(modelViewMatrix, viewMatrix, modelMatrix);

  if (myDrawableInitialized) {
    myDrawable.draw();
  }
}

/**
 * Used to setup some callback functions to use the sliders for 
 * the camera
 */
function setupUI() {
  // in index.html we need to setup some callback functions for the sliders
  // right now just have them report the values beside the slider.
  let sliders = ['cam', 'look'];
  let dims = ['X', 'Y', 'Z'];
  // for cam and look UI..
  sliders.forEach(controlType => {
    // for x, y, z control slider...
    dims.forEach(dimension => {
      let slideID = `${controlType}${dimension}`;
      console.log(`Setting up control for ${slideID}`);
      let slider = document.getElementById(slideID);
      let sliderVal = document.getElementById(`${slideID}Val`);
      // These are called "callback functions", essentially when the input
      // value for the slider or the field beside the slider change,
      // run the code we supply here!
      slider.oninput = () => {
        let newVal = slider.value;
        sliderVal.value = newVal;
      };
      sliderVal.oninput = () => {
        let newVal = sliderVal.value;
        slider.value = newVal;
      };
    });
  });
}

/**
 * 
 * @param {*} vSource 
 * @param {*} fSource 
 * @param {*} objData 
 */
// function initializeObject(
//   vSource,
//   fSource,
//   objData,
// ) {
//   myShader = new Shader(vSource, fSource); // create new shader object
//   parsedData = new OBJData(objData);    // get model information
//   let rawData = parsedData.getFlattenedDataFromModelAtIndex(0);

//   // create buffers on the GPU using object data
//   let vertexPositionBuffer = new VertexArrayData(
//     rawData.vertices, // the data
//     gl.FLOAT,         // type webGL should treat the data
//     3                 // how many per vertex
//   );

//   let vertexBarycentricBuffer = new VertexArrayData(
//     rawData.barycentricCoords,
//     gl.FLOAT,
//     3
//   );

//   let bufferMap = {
//     'aVertexPosition': vertexPositionBuffer,
//     'aBarycentricCoord': vertexBarycentricBuffer,
//   }

//   myDrawable = new Drawable(
//     myShader, 
//     bufferMap, 
//     null, 
//     rawData.vertices.length / 3
//   );

//   // myDrawable.uniformLocations = myShader.getUniformLocations(['uModelViewMatrix', 'uProjectionMatrix']);
//   // myDrawable.uniformSetup = () => {
//   //   gl.uniformMatrix4fv(
//   //     myDrawable.uniformLocations.uProjectionMatrix, 
//   //     false, 
//   //     projectionMatrix
//   //   );

//   //   gl.uniformMatrix4fv(
//   //     myDrawable.uniformLocations.uModelViewMatrix, 
//   //     false, 
//   //     modelViewMatrix
//   //   );
//   // };
//   myDrawable.uniformLocations = myShader.getUniformLocations(['uModelViewMatrix', 'uProjectionMatrix']);
//   myDrawable.uniformSetup = () => {
//     gl.uniformMatrix4fv(
//       myDrawable.uniformLocations.uProjectionMatrix,
//       false,
//       projectionMatrix
//     );
//     gl.uniformMatrix4fv(
//       myDrawable.uniformLocations.uModelViewMatrix,
//       false,
//       modelViewMatrix
//     );
//   };

//   myDrawableInitialized = true;
// }

function initializeObject(vertSource, fragSource, objData) {

  myShader = new Shader(vertSource, fragSource); // this class is in shader.js
  parsedData = new OBJData(objData); // this class is in obj-loader.js
  let rawData = parsedData.getFlattenedDataFromModelAtIndex(0);

  // Generate Buffers on the GPU using the geometry data we pull from the obj
  let vertexPositionBuffer = new VertexArrayData( // this class is in vertex-data.js
    rawData.vertices, // What is the data?
    gl.FLOAT,         // What type should WebGL treat it as?
    3                 // How many per vertex?
  );
  /*
  let vertexNormalBuffer = new VertexArrayData(
    rawData.normals,
    gl.FLOAT,
    3
  );
  let vertexTexCoordBuffer = new VertexArrayData (
    rawData.uvs,
    gl.FLOAT,
    2
  );
  */
  let vertexBarycentricBuffer = new VertexArrayData (
    rawData.barycentricCoords,
    gl.FLOAT,
    3
  );

  /*
  For any model that is smooth (non discrete) indices should be used, but we are learning! Maybe you can get this working later?
  One indicator if a model is discrete: a vertex position has two normals.
  A cube is discrete if only 8 vertices are used, but each vertex has 3 normals (each vertex is on the corner of three faces!)
  The sphere and bunny obj models are smooth though */
  // getFlattenedDataFromModelAtIndex does not return indices, but getIndexableDataFromModelAtIndex would
  //let vertexIndexBuffer = new ElementArrayData(rawData.indices);

  // In order to let our shader be aware of the vertex data, we need to bind
  // these buffers to the attribute location inside of the vertex shader.
  // The attributes in the shader must have the name specified in the following object
  // or the draw call will fail, possibly silently!
  // Checkout the vertex shaders in resources/shaders/verts/* to see how the shader uses attributes.
  // Checkout the Drawable constructor and draw function to see how it tells the GPU to bind these buffers for drawing.
  let bufferMap = {
    'aVertexPosition': vertexPositionBuffer,
    'aBarycentricCoord': vertexBarycentricBuffer,
    // 'aVertexNormal': vertexNormalBuffer, -> Not working with normals, yet! The sphere has norms included, the bunny needs norms generated.
    // 'aVertexTexCoord': vertexTexCoordBuffer -> Same, not working with texture coords yet.
  };

  myDrawable = new Drawable(myShader, bufferMap, null, rawData.vertices.length / 3);

  // Checkout the drawable class' draw function. It calls a uniform setup function every time it is drawn. 
  // Put your uniforms that change per frame in this setup function.
  myDrawable.uniformLocations = myShader.getUniformLocations(['uModelViewMatrix', 'uProjectionMatrix']);
  myDrawable.uniformSetup = () => {
    gl.uniformMatrix4fv(
      myDrawable.uniformLocations.uProjectionMatrix,
      false,
      projectionMatrix
    );
    gl.uniformMatrix4fv(
      myDrawable.uniformLocations.uModelViewMatrix,
      false,
      modelViewMatrix
    );
  };

  myDrawableInitialized = true;
}

window.onload = main;

// // Ideally, we like to avoid global vars, a GL context lives as long as the window does
// // So this is a case where it is understandable to have it in global space.
// var gl = null;
// // The rest is here simply because it made debugging easier...
// var myShader = null;
// var myDrawable = null;
// var myDrawableInitialized = null;
// var modelViewMatrix = null;
// var projectionMatrix = null;
// var globalTime = 0.0;
// var parsedData = null;

// function main() {
//   const canvas = document.getElementById('main-canvas');
//   // Initialize the GL context
//   gl = canvas.getContext('webgl2');

//   // Only continue if WebGL is available and working
//   if (gl === null) {
//     alert('Unable to initialize WebGL2. Contact the TA.');
//     return;
//   }

//   // Set clear color to whatever color this is and fully opaque
//   gl.clearColor(0.7, 0.7, 0.9, 1.0);
//   // Clear the depth buffer
//   gl.clearDepth(1.0);
//   // Enable the depth function to draw nearer things over farther things
//   gl.depthFunc(gl.LEQUAL);
//   gl.enable(gl.DEPTH_TEST);

//   // Draw the scene repeatedly
//   let then = 0.0;
//   function render(now) {
//     now *= 0.001;  // convert to seconds
//     const deltaTime = now - then;
//     then = now;

//     drawScene(deltaTime);

//     requestAnimationFrame(render);
//   }
//   requestAnimationFrame(render);

//   // The Projection matrix rarely needs updated.
//   // Uncommonly, it is only modified in wacky sequences ("drunk" camera effect in GTAV)
//   // or an artificial "zoom" using FOV (ARMA3)
//   // Typically it is only updated when the viewport changes aspect ratio.
//   // So, set it up here once since we won't let the viewport/canvas resize.
//   const FOV = degreesToRadians(60);
//   const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
//   const zNear = 0.1;
//   const zFar  = 100.0;
//   projectionMatrix = glMatrix.mat4.create();
//   glMatrix.mat4.perspective(projectionMatrix,
//                    FOV,
//                    aspectRatio,
//                    zNear,
//                    zFar);

//   // Setup Controls
//   setupUI();

//   // Right now, in draw, the scene will not render until the drawable is prepared
//   // this allows us to acynchronously load content. If you are not familiar with async
//   // that is a-okay! This link below should explain more on that topic:
//   // https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff
//   setupScene();
// }

// function setupUI() {
//   // in index.html we need to setup some callback functions for the sliders
//   // right now just have them report the values beside the slider.
//   let sliders = ['cam', 'look'];
//   let dims = ['X', 'Y', 'Z'];
//   // for cam and look UI..
//   sliders.forEach(controlType => {
//     // for x, y, z control slider...
//     dims.forEach(dimension => {
//       let slideID = `${controlType}${dimension}`;
//       console.log(`Setting up control for ${slideID}`);
//       let slider = document.getElementById(slideID);
//       let sliderVal = document.getElementById(`${slideID}Val`);
//       // These are called "callback functions", essentially when the input
//       // value for the slider or the field beside the slider change,
//       // run the code we supply here!
//       slider.oninput = () => {
//         let newVal = slider.value;
//         sliderVal.value = newVal;
//       };
//       sliderVal.oninput = () => {
//         let newVal = sliderVal.value;
//         slider.value = newVal;
//       };
//     });
//   });
// }

// // Async as it loads resources over the network.
// async function setupScene() {
//   let objData = await loadNetworkResourceAsText('resources/models/sphere.obj');
//   let vertSource = await loadNetworkResourceAsText('resources/shaders/vertex/bary300.vert');
//   let fragSource = await loadNetworkResourceAsText('resources/shaders/fragment/bary300.frag');
//   initializeMyObject(vertSource, fragSource, objData);
// }

// function drawScene(deltaTime) {
//   globalTime += deltaTime;

//   // Clear the color buffer with specified clear color
//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//   let modelMatrix = glMatrix.mat4.create();
//   let objectWorldPos = [0.0, 0.0, -6.0];
//   let rotationAxis = [1.0, 1.0, 0.0];
//   glMatrix.mat4.translate(modelMatrix, modelMatrix, objectWorldPos);
//   glMatrix.mat4.rotate(modelMatrix,
//                        modelMatrix,
//                        globalTime,
//                        rotationAxis
//                       );

//   let viewMatrix = glMatrix.mat4.create();
//   let cameraPos = [0.0, 0.0, Math.sin(globalTime) * 4.0];
//   let cameraFocus = [0.0, 0.0, -6.0];
//   glMatrix.mat4.lookAt(viewMatrix,
//                        cameraPos,
//                        cameraFocus,
//                        [0.0, 1.0, 0.0]
//                       );

//   modelViewMatrix = glMatrix.mat4.create();
//   glMatrix.mat4.mul(modelViewMatrix, viewMatrix, modelMatrix);

//   if (myDrawableInitialized){
//     myDrawable.draw();
//   }
// }

// function initializeMyObject(vertSource, fragSource, objData) {

//   myShader = new Shader(vertSource, fragSource); // this class is in shader.js
//   parsedData = new OBJData(objData); // this class is in obj-loader.js
//   let rawData = parsedData.getFlattenedDataFromModelAtIndex(0);

//   // Generate Buffers on the GPU using the geometry data we pull from the obj
//   let vertexPositionBuffer = new VertexArrayData( // this class is in vertex-data.js
//     rawData.vertices, // What is the data?
//     gl.FLOAT,         // What type should WebGL treat it as?
//     3                 // How many per vertex?
//   );
//   /*
//   let vertexNormalBuffer = new VertexArrayData(
//     rawData.normals,
//     gl.FLOAT,
//     3
//   );
//   let vertexTexCoordBuffer = new VertexArrayData (
//     rawData.uvs,
//     gl.FLOAT,
//     2
//   );
//   */
//   let vertexBarycentricBuffer = new VertexArrayData (
//     rawData.barycentricCoords,
//     gl.FLOAT,
//     3
//   );

//   /*
//   For any model that is smooth (non discrete) indices should be used, but we are learning! Maybe you can get this working later?
//   One indicator if a model is discrete: a vertex position has two normals.
//   A cube is discrete if only 8 vertices are used, but each vertex has 3 normals (each vertex is on the corner of three faces!)
//   The sphere and bunny obj models are smooth though */
//   // getFlattenedDataFromModelAtIndex does not return indices, but getIndexableDataFromModelAtIndex would
//   //let vertexIndexBuffer = new ElementArrayData(rawData.indices);

//   // In order to let our shader be aware of the vertex data, we need to bind
//   // these buffers to the attribute location inside of the vertex shader.
//   // The attributes in the shader must have the name specified in the following object
//   // or the draw call will fail, possibly silently!
//   // Checkout the vertex shaders in resources/shaders/verts/* to see how the shader uses attributes.
//   // Checkout the Drawable constructor and draw function to see how it tells the GPU to bind these buffers for drawing.
//   let bufferMap = {
//     'aVertexPosition': vertexPositionBuffer,
//     'aBarycentricCoord': vertexBarycentricBuffer,
//     // 'aVertexNormal': vertexNormalBuffer, -> Not working with normals, yet! The sphere has norms included, the bunny needs norms generated.
//     // 'aVertexTexCoord': vertexTexCoordBuffer -> Same, not working with texture coords yet.
//   };

//   myDrawable = new Drawable(myShader, bufferMap, null, rawData.vertices.length / 3);

//   // Checkout the drawable class' draw function. It calls a uniform setup function every time it is drawn. 
//   // Put your uniforms that change per frame in this setup function.
//   myDrawable.uniformLocations = myShader.getUniformLocations(['uModelViewMatrix', 'uProjectionMatrix']);
//   myDrawable.uniformSetup = () => {
//     gl.uniformMatrix4fv(
//       myDrawable.uniformLocations.uProjectionMatrix,
//       false,
//       projectionMatrix
//     );
//     gl.uniformMatrix4fv(
//       myDrawable.uniformLocations.uModelViewMatrix,
//       false,
//       modelViewMatrix
//     );
//   };

//   myDrawableInitialized = true;
// }

// // After all the DOM has loaded, we can run the main function.
// window.onload = main;