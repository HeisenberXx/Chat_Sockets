import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {}})

const __dirname = dirname(fileURLToPath(import.meta.url));

// Servir archivos estáticos desde la raíz del proyecto (incluyendo src/, index.html, etc.)
app.use(express.static(__dirname));

const connectedUsers = new Map();

io.on('connection', (socket) => {
  const username = `Anónimo-${socket.id.slice(0, 4)}`;
  connectedUsers.set(socket.id, { id: socket.id, username });
  console.log(`${username} (${socket.id}) se ha conectado.`);

  // Enviar datos de la sesión al cliente que se conecta
  socket.emit('session', { id: socket.id, username });

  // Enviar lista de usuarios actualizada a todos
  io.emit('users updated', Array.from(connectedUsers.values()));

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`${user.username} (${socket.id}) se ha desconectado.`);
      connectedUsers.delete(socket.id);
      io.emit('users updated', Array.from(connectedUsers.values()));
    }
  });

  socket.on('chat message', (msg) => {
    const user = connectedUsers.get(socket.id);
    io.emit('chat message', { 
      id: socket.id,
      user: user.username,
      msg,
    });
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});