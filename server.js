const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const io = require("socket.io")(3000);
const app = express();

const users = {};
// This is used to ensure that the website loads files mostly the css // The middleware
app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src/css')));
// =================================================

// Here we use the router to fetch pages 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// =================================================


// This returns the index page!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/html', 'index.html'));
})
// =================================================


// This is the major chat server that connects to the other servers!
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
// =========================================================
const PORT = process.env.PORT || 5100;
app.listen(PORT, console.log(`Server started on ${PORT}`));