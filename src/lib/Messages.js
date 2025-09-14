export function openChat(receivedSocket, socketEmit) {
    chatRender(receivedSocket);
    document.getElementById('btn-send').onclick = (e) => sendMessage(receivedSocket, socketEmit);

}


function chatRender(socket) {
    const chatTitle = document.getElementById('chat-title');
    chatTitle.textContent = `Chat con ${socket.username}`;
}

function sendMessage(receivedSocket, socket) {
    const messageIput = document.getElementById('input-message')
    socket.emit('chat message', { message: messageIput.value, to: receivedSocket.id });
    CreateChatBubble(messageIput.value, true);
    messageIput.value = '';
}

export function CreateChatBubble(message, isCurrentUser) {
    const item = document.createElement('div');
    item.className = isCurrentUser ? 'chat chat-end' : 'chat chat-start';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = message;

    item.appendChild(bubble);

    const messagesContainer = document.getElementById('chat-bubble');
    messagesContainer.appendChild(item);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

