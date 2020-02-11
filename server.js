const express = require('express');
const path = require('path');
const knex = require('knex');
const io = require("socket.io")(3000);
const app = express();

const users = {};

// This is the major chat server that connects to the other servers!

// This is used to ensure that the website loads files mostly the css 
app.use(express.static(path.join(__dirname, 'src')));
// =================================================

// This returns the index page!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/html', 'index.html'));
})
// =================================================

// Creat a database with knex!
var database = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'myapp_test'
    }
});
// ================================================
io.on("connection", socket => {
    socket.on("send-chat-message", message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        });
    })
    socket.on("new_user", name => {
        users[socket.id] = name;
        socket.broadcast.emit('user_connected', name);
    })
    // This handles the disconnection on the app.
    socket.on("disconnect", () => {
        socket.broadcast.emit("User_disconnected", users[socket.id]);
        delete users[socket.id];
    })
})
const PORT = process.env.PORT || 5100;
app.listen(PORT, console.log(`Server started on ${PORT}`));