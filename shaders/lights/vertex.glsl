attribute vec3 a_position;
attribute vec4 a_color;
attribute vec3 a_data;

varying vec4 v_color;
varying vec3 v_data;

uniform mat4 u_projection;

void main() {
    v_color = a_color;
    v_data = a_data;
    gl_Position = u_projection * vec4(a_position, 1.0);
}