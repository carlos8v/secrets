import io from 'socket.io-client';

const socket = io(`http://${process.env.REACT_APP_SERVER_IP}:3333`, {
  autoConnect: false,
});

function connect() {
  socket.connect();
}

function checkForNewSecrets() {
  socket.on('newSecret', (newSecret) => {
    console.log(newSecret);
  })
}

function sendNewSecret(secret) {
  socket.emit('sendingNewSecret', secret);
}

export {
  connect,
  checkForNewSecrets,
  sendNewSecret,
}
