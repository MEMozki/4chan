document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    
    const ws = new WebSocket('ws://localhost:8080'); // Assuming you have a WebSocket server running at this address
    
    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        displayMessage(message.text, message.timestamp);
    };

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value;
        const timestamp = new Date().getTime();
        ws.send(JSON.stringify({ text: message, timestamp: timestamp }));
        messageInput.value = '';
    });

    function displayMessage(text, timestamp) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        
        setTimeout(() => {
            chatWindow.removeChild(messageElement);
        }, 3600000); // 1 hour in milliseconds
    }
});
