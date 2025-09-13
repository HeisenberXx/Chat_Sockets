export function openChat(receivedSocket, socketEmit) {
    console.log('User clicked on the user list ', receivedSocket);
    chatRender(receivedSocket);
    document.getElementById('btn-send').onclick = (e) => sendMessage(receivedSocket, socketEmit);

}


function chatRender(socket) {
    const chatTitle = document.getElementById('chat-title');
    chatTitle.textContent = `Chat con ${socket.username}`;
}

function sendMessage(user, socket) {
    const messageIput = document.getElementById('input-message')
    socket.emit('chat message', messageIput.value);
    messageIput.value = '';
}

