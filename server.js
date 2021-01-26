const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const io = require("socket.io")(3000);
const app = express();

const users = {};
// This is used to ensure that the website loads files mostly the css // The middleware
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5100);
app.use(express.static(path.join(__dirname, 'src')));
// =================================================

// Here we use the router to fetch pages 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// =================================================
// =================================================


// This is the major chat server that connects to the other servers!
io.on("connection", (socket) => {
    socket.username = "Anonymous";

    // socket.on('change_Username', (data) => {
    //     socket.username = data.username;
    // })
    // This handles the disconnection on the app.
    // socket.on("disconnect", () => {
    //     socket.broadcast.emit("User_disconnected", users[socket.id]);
    //     delete users[socket.id];
    // })
    console.log('connected successfully!');
})
// =========================================================
const PORT = app.get('port');
app.listen(PORT, () => console.log(`Server started on ${PORT}`));