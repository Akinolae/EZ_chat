const io = require("socket.io")(3000);

const users = {};

io.on("connection", socket => {
    socket.on("send-chat-message", message => {
        socket.broadcast.emit('chat-message', message);
    })
    socket.on("new_user", name => {
        users[socket.id] = name;
        socket.broadcast.emit('user_connected', name);
    })
    // This handles the disconnection on the app.
    socket.on("disconnection", () => {
        io.emit("offline")
    })
})