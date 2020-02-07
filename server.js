const io = require("socket.io")(3000);

const users = {};

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