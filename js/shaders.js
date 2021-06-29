async function prepareMultiplyShader(renderer, url) {
    try {
        const fragment = await fetch(url + "fragment.glsl").then(data => data.text());
        const vertex = await fetch(url + "vertex.glsl").then(data => data.text());

        const attributes = [
            {name: "a_position", size: 3},
            {name: "a_texCoord", size: 2}
        ];

        const uniforms = [
            {name: "u_projection", type: Renderer.Uniform.Matrix4},
            {name: "u_background", type: Renderer.Uniform.Integer},
            {name: "u_postprocessing", type: Renderer.Uniform.Integer}
        ];

        const matrix = $R.Create.Camera2D(0, 900, 0, 600);
        
        const shader = renderer.create.shader(vertex, fragment, attributes, uniforms);
        shader.setUniform("u_projection", matrix.matrix);
        shader.setUniform("u_background", 0);
        shader.setUniform("u_postprocessing", 1);

        return shader;
    } catch(error) {
        console.log(error);
        return null;
    }
}

async function prepareLightShader(renderer, url) {
    try {
        const fragment = await fetch(url + "fragment.glsl").then(data => data.text());
        const vertex = await fetch(url + "vertex.glsl").then(data => data.text());

        const attributes = [
            {name: "a_position", size: 3},
            {name: "a_color", size: 4},
            {name: "a_data", size: 3}
        ];

        const uniforms = [
            {name: "u_projection", type: Renderer.Uniform.Matrix4}
        ];

        const matrix = $R.Create.Camera2D(0, 900, 0, 600);

        const shader = renderer.create.shader(vertex, fragment, attributes, uniforms);
        shader.setUniform("u_projection", matrix.matrix);

        return shader;
    } catch(error) {
        console.log(error);
        return null;
    }
}