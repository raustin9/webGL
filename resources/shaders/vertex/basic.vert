// precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aVertexTextureCoord;

varying vec2 vFragmentTextureCoord;

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  vFragmentTextureCoord = aVertexTextureCoord;
  gl_Position = uProjectionMatrix * uViewMatrix * uWorldMatrix * vec4(aVertexPosition, 1.0);
}