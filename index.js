const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
let dataURL = "";

(async () => {
    io.on("connection", (socket) => {
        socket.emit("new-canvas-data", { dataURL: dataURL });
        socket.on("canvas-changed", (data) => {
            console.log(dataURL);
            dataURL = data.dataURL;
            socket.broadcast.emit("new-canvas-data", { dataURL: dataURL });
        });
    });

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
    });

    app.get("/client.js", (req, res) => {
        res.sendFile(__dirname + "/client.js");
    });


    app.get("/socket.io.min.js", (req, res) => {
        res.sendFile(__dirname + "/socket.io.min.js");
    });

    httpServer.listen(3000);
})();

