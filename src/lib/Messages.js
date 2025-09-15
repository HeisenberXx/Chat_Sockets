let currentChatPage = null;
let generalChatObject = {}
export function openChat(receivedSocket = null, socketEmit = null, chatContext = 'General') {
    if(chatContext != 'General') {
        clearNotification(receivedSocket);
        chatRender(receivedSocket);

        socketEmit.emit('get history', { to: receivedSocket.id });
        document.getElementById('btn-send').onclick = (e) => sendMessage(receivedSocket, socketEmit);
        document.getElementById('input-message').onkeydown = (e) => {
            if (e.key === 'Enter') {
                sendMessage(receivedSocket, socketEmit);
            }
        };
    } else{
        generalChatObject = {
            id: 'General$Chat',
            username: 'General'
        }
        chatRender(generalChatObject);
    }
}


function chatRender(socket) {
    const chatTitle = document.getElementById('chat-title');
    chatTitle.dataset.id = socket.id;
    currentChatPage = chatTitle.dataset.id;

    const containerMessages = document.getElementById('chat-bubble');
    while (containerMessages.firstChild) {
        containerMessages.removeChild(containerMessages.firstChild);
    }
    chatTitle.textContent = socket.username != 'General' ? `Chat con ${socket.username}` : 'Chat General'; ;
}

function sendMessage(receivedSocket, socket) {
    console.log(receivedSocket, socket)
    const messageIput = document.getElementById('input-message')
    console.log('enviado')
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

export function renderChatHistory(history, idSocket) {
    history.forEach(({message, id}) => {
        const isCurrentUser = id === idSocket;
        CreateChatBubble(message, isCurrentUser);
    });
}

export function verifyIfChatIsOpen(id) {
    return currentChatPage === id;
}


export function notificateMessage(id) {
    const itemUser = document.getElementById(`item-${id}`);
    const notification = document.getElementById(`${id}-notification`);

    if(notification.style.display != 'flex') {
        notification.className = 'notification';
        itemUser.style.backgroundColor = '#0ea5e91f';
        notification.style.setProperty('display', 'flex', 'important');
        notification.style.setProperty('font-weight', '600', 'important');
        notification.innerText = '1';
    }else{
        notification.innerText = parseInt(notification.innerText) + 1;
    }
}

function clearNotification(id) {
    document.getElementById(`item-${id.id}`).style.backgroundColor = 'transparent';
    const notification = document.getElementById(`${id.id}-notification`);
    notification.innerText = '';
    notification.style.setProperty('display', 'none', 'important');
}

