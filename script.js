document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    
    const ws = new WebSocket('ws://localhost:8080'); // Assuming you have a WebSocket server running at this address
    
    ws.onopen = () => {
        statusElement.textContent = 'Connected';
        statusElement.style.color = 'green';
    };
    
    ws.onclose = () => {
        statusElement.textContent = 'Disconnected';
        statusElement.style.color = 'red';
    };
    
    ws.onerror = () => {
        statusElement.textContent = 'Error';
        statusElement.style.color = 'orange';
    };

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value;
        const timestamp = new Date().getTime();
        ws.send(JSON.stringify({ text: message, timestamp: timestamp }));
        messageInput.value = '';
    });
});
