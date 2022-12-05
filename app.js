var socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('chatform')
const input = document.getElementById('msg')
const chat = document.getElementById('chat')
const users = document.getElementById('users')

const name = prompt('What is your name?')
socket.emit('new-user', name)
appendUser(name)

socket.on('chat-message', data => {
   appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
  appendUser(`${name}`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const message = input.value
  appendMessage(`${name}: ${message}`)
  socket.emit('send-chat-message', message)
  input.value = ''
})

function appendMessage(message){
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  chat.append(messageElement)
}

function appendUser(name){
  const nameElement = document.createElement('div')
  nameElement.innerText = name
  users.append(nameElement)
}
