
const available = document.getElementById("available");
const welcome = document.getElementById('welcome')
const text = document.getElementById('text')
const form = document.getElementById('form');
const msg = document.getElementById('msg')
const audio = document.getElementById('audio')
const socket = io()

socket.on('connect', () => {
  available.style.display = 'block';
})

socket.on('text', (message) => {
  sendMessage(message)
  audio.play();
})

socket.on('message', message => {
  if(message === 'offline'){
    welcome.style.color = 'red'
  }else {
    welcome.style.color = 'rgb(57, 175, 57)'
  }
  welcome.textContent = message
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = e.target.elements.text.value
  socket.emit('chatText', message)
})

const sendMessage = (message) => {
  const bd = document.createElement('div');
  bd.classList.add('msg')
  bd.innerHTML = `
  <p>${message}</p>
 `
 document.querySelector('.message-body').appendChild(bd);
}