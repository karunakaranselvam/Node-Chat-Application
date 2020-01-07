var Sequelize = require('sequelize');
var dateTime = require('node-datetime');
const {
    base64encode,
    base64decode
} = require('nodejs-base64');

var Chats = require("../models/Chat");
var numUsers = 0;

module.exports = function(io) {
io.on('connection', socket => {


  socket.on('postcomment user', () =>  {
    console.log("lop");
  });

    // when the client emits 'new message', this listens and executes
    socket.on('new message', data => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data.msg,
        senderid : socket.sender_id,
        recieverid : data.receiverid
      });


    var msg = data.msg;
    var sender_id = base64decode(socket.sender_id);
    var receiver_id = base64decode(data.receiverid);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    
    Chats.create({
        sender_id: sender_id,
        receiver_id: receiver_id,
        msg: msg,
        created_date: date,
        chater_name: socket.chater
    }).then(function (users) {
        if (users) {
        } else {
            res.status(400).send('Error in insert new record');
        }
    });

    });

    socket.on('private message', data => {
      // we tell the client to execute 'new message'
      socket.emit('private message', {
        username: socket.username,
        message: data.msg,
        senderid : socket.sender_id,
        recieverid : data.receiverid
      });


    var msg = data.msg;
    var sender_id = base64decode(socket.sender_id);
    var receiver_id = base64decode(data.receiverid);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    
    Chats.create({
        sender_id: sender_id,
        receiver_id: receiver_id,
        msg: msg,
        created_date: date,
        chater_name: socket.chater
    }).then(function (users) {
        if (users) {
        } else {
            res.status(400).send('Error in insert new record');
        }
    });

    });


    // when the client emits 'add user', this listens and executes
  socket.on('add user', main => {
    // we store the username in the socket session for this client
    socket.username = main.username;
    socket.sender_id=main.sender_id;
    socket.chater=main.chater;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers,
      username : socket.username
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      sender: socket.sender_id,
      chater : socket.chater,
      numUsers: numUsers
    });
  });
  
     // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });



});




};
