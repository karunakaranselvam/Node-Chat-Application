var express = require('express');
var bodyParser = require('body-parser');
// var morgan = require('morgan');
// var fs = require('fs');
// var path = require('path');


var app = express();
var port = process.env.PORT || 5000;
app.locals.rootpath = "http://90.0.1.73/chat";
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
app.set('view engine', 'ejs');

// app.use(morgan('dev'));
// var accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'), {flags: 'a'}
// );
// // setup the logger
// app.use(morgan('combined', {stream: accessLogStream}));


var Chat = require("./routes/Chat");

app.use("/", Chat);

var server = app.listen(port);

console.log("Server Running On Port: " + port);

var io = require('socket.io').listen(server);

require('./routes/group')(io);



