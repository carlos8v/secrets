require('dotenv').config();
const socketio = require('socket.io');

exports.setupWebSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: `http://localhost:${process.env.WEB_APPLICATION_PORT}`,
      methods: ['GET', 'POST'],
    },
  });
  
  io.on('connection', socket => {
    socket.on('sendingNewSecret', (secret) => {
      socket.emit('newSecret', secret);
    });
  })
};
