const socket = io('http://localhost:3000');
// const messageForm = document.getElementById('btn-submit');
const message = document.getElementById('messages');
const timeContainer = document.getElementById('time');
const form = document.getElementById('msg-container');
const inputText = document.getElementById('text');

// Create a new date that tells you the time when the message was sent !
// It comes at the base of the recieved and send message.

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const time = `${hours} : ${minutes}`
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
    const msgTime = document.createElement('div');
    msgTime.innerText = time;
    newMsg.innerText = Msg;
    // timeContainer.append(msgTime)
    form.append(newMsg);
    form.append(msgTime);
}