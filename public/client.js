const socket = io();

let name;

do {
    name = prompt('Enter your Name:');
}
while (!name);

let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message_area');
var audio = new Audio('ting.mp3');

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {

    let msg = {
        user: name,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrolltobottom();

    /*Send to Server*/
    socket.emit('message', msg);

}

function appendMessage(msg, type) {

    let maindiv = document.createElement('div');
    let classname = type;
    maindiv.classList.add(classname, 'message');

    let markup = `<h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    maindiv.innerHTML = markup;
    messagearea.appendChild(maindiv);

    if (type == 'incoming') {
        audio.play();
    }

}

/* Recieve Message*/

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrolltobottom();
})

function scrolltobottom() {
    messagearea.scrollTop = messagearea.scrollHeight;
}