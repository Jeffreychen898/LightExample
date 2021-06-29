let texture;
let backgroundBuffer, postprocessingBuffer;

let multiplyShader, lightShader;

let mouseX, mouseY;

let lightsList = [];
window.onload = async () => {
    onReady();   

    //create the renderer
    const config = {
        canvas: "canvas"
    }

    const renderer = $R.Create.Renderer(config);

    //add light to list
    renderer.$m_canvas.addEventListener("click", mouseClicked);

    //calculate mouse position
    mouseX = 0;
    mouseY = 0;
    renderer.$m_canvas.addEventListener("mousemove", (e) => mousemove(e, renderer.$m_canvas));

    //texture buffers
    backgroundBuffer = renderer.create.textureBuffer(900, 600);
    postprocessingBuffer = renderer.create.textureBuffer(900, 600);

    //shaders
    multiplyShader = await prepareMultiplyShader(renderer, "/shaders/multiply/");
    lightShader = await prepareLightShader(renderer, "/shaders/lights/");

    //textures
    texture = renderer.create.texture("/background.jpg");

    animationLoop(renderer);
}

function animationLoop(renderer) {
    renderer.clear();
    backgroundBuffer.clear();
    postprocessingBuffer.clear();

    //draw the image
    {
        const properties = {
            textureBuffer: backgroundBuffer
        };
        renderer.draw.image(texture, 0, 0, 900, 600, properties);
    }

    //draw the lights
    {
        const current_light = {
            x: mouseX,
            y: mouseY,
            intensity: lightIntensity,
            color: lightColor
        };
        const lights_to_draw = [...lightsList, current_light];

        for(const lights of lights_to_draw) {
            const attributes = [
                {name: "a_color", values: [...lights.color, 1]},
                {name: "a_data", values: [lights.x, 600 - lights.y, lights.intensity]}
            ];

            const properties = {
                textureBuffer: postprocessingBuffer,
                blend: Renderer.Blending.Add
            };
            const shape = renderer.create.shape(properties, lightShader);
            renderer.draw.vertex(shape, {x: 0, y: 0}, attributes);
            renderer.draw.vertex(shape, {x: 900, y: 0}, attributes);
            renderer.draw.vertex(shape, {x: 900, y: 600}, attributes);
            renderer.draw.vertex(shape, {x: 0, y: 600}, attributes);
            renderer.draw.shape(shape);
        }
    }

    //draw the texture buffers
    drawTextureBuffers(renderer);

    renderer.flush();
    requestAnimationFrame(() => {
        animationLoop(renderer);
    });
}

function drawTextureBuffers(renderer) {
    const properties = {
        texture: [backgroundBuffer, postprocessingBuffer]
    };
    const shape = renderer.create.shape(properties, multiplyShader);
    renderer.draw.vertex(shape, {x: 0, y: 0}, [{name: "a_texCoord", values: [0, 1]}]);
    renderer.draw.vertex(shape, {x: 900, y: 0}, [{name: "a_texCoord", values: [1, 1]}]);
    renderer.draw.vertex(shape, {x: 900, y: 600}, [{name: "a_texCoord", values: [1, 0]}]);
    renderer.draw.vertex(shape, {x: 0, y: 600}, [{name: "a_texCoord", values: [0, 0]}]);
    renderer.draw.shape(shape);
}

function mousemove(evt, canvas) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

function mouseClicked() {
    lightsList.push({
        x: mouseX,
        y: mouseY,
        intensity: lightIntensity,
        color: [...lightColor]
    });
}