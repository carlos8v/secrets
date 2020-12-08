require('dotenv').config();
const socketio = require('socket.io');

exports.setupWebSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: `http://localhost:${process.env.WEB_APPLICATION_PORT || 3000}`,
      methods: ['GET', 'POST'],
    },
  });
  
  io.on('connection', socket => {
    socket.on('sendingNewSecret', (secret) => {
      io.emit('newSecret', secret);
    });
  })
};
