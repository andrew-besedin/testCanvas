const socket = io();
const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let flag = false;
function mouseDown(event) {
    flag = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY)
}

function mouseUp() {
    flag = false;
    socket.emit("canvas-changed", { dataURL: canvas.toDataURL() });
}

function draw(event) {
    if (!flag) return;
    ctx.lineWidth = 3;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
}

socket.on("new-canvas-data", (data) => {
    let img = document.createElement("img");
    img.src = data.dataURL;
    img.onload = () => ctx.drawImage(img, 0, 0);
});

addEventListener("mousedown", mouseDown);
addEventListener("mouseup", mouseUp);
addEventListener("mousemove", draw);