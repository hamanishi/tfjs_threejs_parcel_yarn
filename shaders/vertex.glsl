//attribute vec4 a_Position;
//attribute vec4 a_Color;

//uniform mat4 u_MvpMatrix;
attribute vec3 position;
uniform mat4 modelViewMatrix;
varying vec4 v_Color;

void main() {
	//gl_Position = position;
	//gl_Position = modelViewMatrix * a_Position;
	v_Color = vec4(position, 1.0);
    gl_Position = modelViewMatrix * vec4(position, 1.0 );
}