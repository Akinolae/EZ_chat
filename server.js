const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const socket = require("socket.io");
const app = express();
const http = require('http');

// This is used to ensure that the website loads files mostly the css // The middleware
const server = http.createServer(app)
const io = socket(server)
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5100);
app.use(express.static(path.join(__dirname, 'src')));
// =================================================

// Here we use the router to fetch pages 

app.use('/', require('./routes/index'));
// =================================================
// =================================================


io.on('connection', (socket) => {
    console.log('connected')
    socket.broadcast.emit('message', 'online')

    socket.on('disconnect', () => {
        io.emit('message', 'offline')
    })

    socket.on('chatText', (message) => {
       io.emit('text', message)
    })
})
const PORT = app.get('port');
server.listen(PORT, () => console.log(`Server started on ${PORT}`));