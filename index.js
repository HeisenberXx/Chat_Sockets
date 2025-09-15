import express from 'express';
import { readFileSync } from 'fs';
import { createServer, get } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { saveMessage, getMessages } from './src/data/MessagesHistory.js';
// import { getMessages } from './src/data/MessagesHistory';

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {}})

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'fonts')));
app.use(express.static(join(__dirname, 'src')));

// const htmlContent = readFileSync(join(__dirname, 'index.html'), 'utf-8');
app.get('/', (req, res) => {
  // const serverUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  // const modifiedHtml = htmlContent.replace('__SOCKET_SERVER_URL__', serverUrl);
  // res.send(modifiedHtml);
});


// Servir archivos estáticos desde la raíz del proyecto (incluyendo src/, index.html, etc.)
app.use(express.static(__dirname));
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  const username = `Anónimo-${socket.id.slice(0, 4)}`;
  connectedUsers.set(socket.id, { id: socket.id, username });
      
  // Enviar datos de la sesión al cliente que se conecta
  socket.emit('session', { id: socket.id, username });

  // Enviar lista de usuarios actualizada a todos
  io.emit('users updated', Array.from(connectedUsers.values()));

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.delete(socket.id);
      io.emit('users updated', Array.from(connectedUsers.values()));
    }
  });
  socket.on('chat message', (message_info) => {
    const { message, to } = message_info
    const user = connectedUsers.get(socket.id);
    saveMessage(socket.id, to, message);
    // const history = getMessages(socket.id, to);
    // console.log(history)
    io.to(to).emit('chat_message', { 
      id: socket.id,
      user: user.username,
      message,
    });
  });
  socket.on('get history', ({ to }) => {
    const history = getMessages(socket.id, to);
    socket.emit('chat history', history);
  })

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});