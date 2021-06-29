let lightColor;
let lightIntensity;
function onReady() {
    const color_picker = document.getElementById("colorpicker");
    const parse_color = hexToRGB(color_picker.value);
    modifyLightColor([parse_color.r, parse_color.g, parse_color.b]);
    color_picker.addEventListener("change", colorPickerChange);

    const random_color = document.getElementById("randomcolor");
    random_color.addEventListener("click", () => randomColor(color_picker));

    const intensity = document.getElementById("intensity");
    lightIntensity = parseInt(intensity.value);
    intensity.addEventListener("change", () => lightIntensity = parseInt(intensity.value));
}

//modify the color
function modifyLightColor(color) {
    lightColor = [
        color[0] / 255,
        color[1] / 255,
        color[2] / 255
    ];
}

//color picker
function hexToRGB(hex) {
    const red = parseInt(hex[1] + hex[2], 16);
    const green = parseInt(hex[3] + hex[4], 16);
    const blue = parseInt(hex[5] + hex[6], 16);
    return {
        r: red,
        g: green,
        b: blue
    };
}

function colorPickerChange() {
    const parse_color = hexToRGB(this.value);
    modifyLightColor([parse_color.r, parse_color.g, parse_color.b]);
}

//random color
function randomColor(colorpicker) {
    const new_color = [Math.random(), Math.random(), Math.random()];
    let hex = "#";
    for(const component of new_color) {
        const value = Math.floor(component * 255).toString(16);
        hex += value.length == 1 ? "0" + value : value;
    }

    colorpicker.value = hex;
}
