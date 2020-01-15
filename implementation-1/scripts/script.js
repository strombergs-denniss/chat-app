let messages = document.querySelector("#messages");
let formInput = document.querySelector("#form__input");
let formButton = document.querySelector("#form__button");

let socket = io();

let id = Math.floor(Math.random() * 10000);

function createMessage(sender, text, type) {
    let flexContainer = document.createElement("div");
    flexContainer.className = "flex-container";

    let message = document.createElement("div");
    message.className = "message";

    let messageSender = document.createElement("div");
    messageSender.className = "message__sender";
    messageSender.innerHTML = sender;

    let messageText = document.createElement("div");
    messageText.className = "message__text";
    messageText.innerHTML = text;

    if (type == id) {
        flexContainer.classList.add("user-flex");
        message.classList.add("user");
    } else {
        message.classList.add("other");
    }

    flexContainer.appendChild(message);
    message.appendChild(messageSender);
    message.appendChild(messageText);

    return flexContainer;
}


formButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    let messageSender = id;
    let messageText = formInput.value;
  

    socket.emit('chat message', [messageSender, messageText, id]);
});

socket.on('chat message', function(msg){
    let message = createMessage(msg[0], msg[1], msg[2]);
    messages.appendChild(message);
});
