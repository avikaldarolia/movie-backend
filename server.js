const express = require('express');
const cors = require('cors')
const app = express();
const http = require('http')
const utils = require('./utils/utils')
// const Sequelize = require('./sequelize');
const path = require('path');
const { Server } = require('socket.io')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.disable('x-powered-by');

// const server = http.createServer(app)



app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

require(__dirname + '/routes/').forEach(function (route) {
  app.use(route.prefix, route.app);
});


app.use(utils.errorHandler);

const PORT = process.env.PORT || 8000;
let server = app.listen(PORT)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User with ID:${socket.id} joined room ${data}`);
  })

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  })
})
console.log(`Example app listening at http://localhost:${PORT}`);
// let server = app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`);
// });


