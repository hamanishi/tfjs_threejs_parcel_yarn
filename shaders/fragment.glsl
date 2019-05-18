precision mediump float;

varying vec4 v_Color;

void main() {
	gl_FragColor = vec4(1,1,1,0.5) * v_Color;
}