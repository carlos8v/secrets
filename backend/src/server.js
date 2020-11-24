const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket');

const express = require('express');
const app = express();
const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3333);
