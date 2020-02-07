const socket = io('http://localhost:3000');
// const messageForm = document.getElementById('btn-submit');
const message = document.getElementById('messages');
const form = document.getElementById('msg-container');
const inputText = document.getElementById('text');


socket.on("chat-message", data => {
    sendMessage(data);
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = inputText.value;
    socket.emit("send-chat-message", message);
    inputText.value = ' ';
})

const sendMessage = (Msg) => {
    const newMsg = document.createElement('div');
    newMsg.innerText = Msg;
    form.append(newMsg)
}