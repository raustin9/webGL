precision mediump float;

varying vec3 vFragmentColor;

void
main() {
  gl_FragColor = vec4(vFragmentColor, 1.0);
}