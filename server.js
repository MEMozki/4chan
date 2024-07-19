const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        const id = uuidv4();
        const expiryTime = Date.now() + 3600000; // 1 hour in milliseconds

        setTimeout(() => {
            console.log(`Message with id ${id} has been deleted`);
        }, 3600000);

        // Log the message without sending it to other clients
        console.log(`Received message: ${parsedMessage.text} at ${parsedMessage.timestamp}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
