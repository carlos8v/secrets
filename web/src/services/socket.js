import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_IP || 'http://localhost:3333', {
  autoConnect: false,
});

function connect() {
  socket.connect();
}

function disconnect() {
  socket.disconnect();
}

function stopCheckingForNewSecrets() {
  socket.off('newSecret');
}

function checkForNewSecrets(callback) {
  socket.on('newSecret', (newSecret) => {
    callback(newSecret);
  })
}

function sendNewSecret(secret) {
  socket.emit('sendingNewSecret', secret);
}

export {
  connect,
  disconnect,
  checkForNewSecrets,
  stopCheckingForNewSecrets,
  sendNewSecret,
}
