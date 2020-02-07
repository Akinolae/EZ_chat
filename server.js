const io = require("socket.io")(3000);


io.on("connection", socket => {
    // console.log('new user');
    // socket.emit("chat-message", "Hello world");
    socket.on("send-chat-message", message => {
        // console.log(message)
        socket.broadcast.emit('chat-message', message)
    })
})