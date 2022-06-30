/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
require('rootpath')();
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('helpers/error-handler.js');
const path = require('path');

const app = express();

const { PORT } = process.env ?? 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('../client/build/')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(cors());

app.use(fileUpload());

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const messageService = require('./service/message');
// api routes
app.use('/users', require('./controllers/users'));
app.use('/products', require('./controllers/products'));
app.use('/orders', require('./controllers/orders'));
app.use('/messages', require('./controllers/messages'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'));
})

// global error handler
app.use(errorHandler);

// start server
io.on('connection', socket => {
  const { senderId, senderName } = socket.handshake.query;
  socket.on('send-message', async message => {
    if (message.senderId) {
      const senderRole = message.isAdmin ? 'Admin' : 'User';

      await messageService.addMessage(
        senderId,
        message.receiverId,
        senderRole,
        senderName,
        message.text
      );
    }

    io.emit('message', message);
  });
  socket.emit('connection', null);
});

server.listen(process.env.PORT ?? 3001, () => {
  console.log(`Server started sucessfully at port ${PORT} <3`);
});
