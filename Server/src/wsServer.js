const WebSocket = require("ws");

let wss;

function init(server) {
    wss = new WebSocket.Server({ server });

    wss.on("connection", ws => {
        console.log("New WebSocket client connected");
        ws.send(JSON.stringify({ message: "Welcome to Task Board WebSocket" }));
    });
}

function broadcast(data) {
    if (!wss) return;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = { init, broadcast };
