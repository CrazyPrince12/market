const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('msgForm');
const input = document.getElementById('msgInput');

// Join room via URL param
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id') || 'general';
socket.emit('joinChat', roomId);

socket.on('message', (msg) => {
    const bubble = document.createElement('div');
    bubble.className = `msg-bubble ${msg.fromMe ? 'msg-sent' : 'msg-received'}`;
    bubble.innerHTML = `<p>${msg.text}</p><small>${new Date(msg.timestamp).toLocaleTimeString()}</small>`;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || Date.now() - (window.lastMsg || 0) < 1000) return; // Rate limit 1s
    window.lastMsg = Date.now();
    socket.emit('sendMessage', { room: roomId, text });
    input.value = '';
});