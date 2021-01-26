// const messageForm = document.getElementById('btn-submit');
const message = document.getElementById("messages");
const send = document.getElementById("send");
const timeContainer = document.getElementById("time");
const form = document.getElementById("msg-container");
const inputText = document.getElementById("text");

const socket = io.connect("http://localhost:3000");
//  For the user to be able to submit his or her username
const user_submit = document.getElementById("user_submit");
const username = document.getElementById("username");
const user_form = document.getElementById("user_form");

// Create a new date that tells you the time when the message was sent !
// It comes at the base of the recieved and send message.
user_submit.addEventListener("click", () => {
  console.log(username.value);
  socket.emit("change_Username", {
    username: username.value,
  });
});

console.log(send);

send.addEventListener("click", () => {
  prompt("are you sure");
});
// const user = username.value;
// The time was set here:
console.log(username);
const sendMessage = (Msg) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours} : ${minutes}`;

  const newMsg = document.createElement("div");
  const msgTime = document.createElement("div");
  msgTime.innerText = time;
  newMsg.innerText = Msg;
  // timeContainer.append(msgTime)
  if (newMsg.innerText === "") {
    msgTime.style.display = "none";
  } else {
    form.append(newMsg);
    form.append(msgTime);
  }
};

// const user = prompt("Kindly enter your name ");

sendMessage("you just joined");
socket.emit("new_user", user);

socket.on("chat-message", (data) => {
  sendMessage(`${data.name}: ${data.message}`);
});

socket.on("user_connected", (user) => {
  sendMessage(`${user} just connected`);
});

socket.on("User_disconnected", (name) => {
  sendMessage(`${name}: offline`);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputText.value;
  socket.emit("send-chat-message", message);
  sendMessage(`you: ${message}`);
  inputText.value = " ";
});
