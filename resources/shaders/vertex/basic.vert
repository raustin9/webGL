// precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;

varying vec3 vFragmentColor;

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  vFragmentColor = aVertexColor;
  gl_Position = uProjectionMatrix * uViewMatrix * uWorldMatrix * vec4(aVertexPosition, 1.0);
}