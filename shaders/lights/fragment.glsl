precision mediump float;

varying vec4 v_color;
varying vec3 v_data;

void main() {
    vec2 position = vec2(gl_FragCoord.x, gl_FragCoord.y);
    float dist = length(position - v_data.xy) + v_data.z;
    float brightness = v_data.z / dist;
    gl_FragColor = v_color * vec4(vec3(brightness), 1.0);
}