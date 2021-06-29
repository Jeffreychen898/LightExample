precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_background;
uniform sampler2D u_postprocessing;

void main() {
    vec4 background_pixel = texture2D(u_background, v_texCoord);
    vec4 postprocessing_pixel = texture2D(u_postprocessing, v_texCoord);
    gl_FragColor = background_pixel * postprocessing_pixel;
}