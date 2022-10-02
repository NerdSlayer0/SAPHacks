const socket = io();

let count = 0;

const input = document.getElementById("chatContent");
let last = "";

function sendChat() {
  const message = input.value.trim();
  input.value = "";
  if (message.length) socket.emit("postChat", message);
  if (++count == 10) {
    document.getElementById("popupContainer").style.right = "20px";
    count = 0;
  }
}

socket.on("updateChat", (Mcontent, sender = "Raphael") => {
  let template = document.getElementById("newChat").content.cloneNode(true);
  if (last != sender) template.querySelector(".chatSender").innerHTML = "Raphael";
  template.querySelector(".chatContent").innerHTML = Mcontent;
  let chat = document.getElementById("chatList")
  chat.appendChild(template);
  chat.scrollTop = chat.scrollHeight;
  last = sender;
});

window.addEventListener('keyup', (event) => {
  if (document.activeElement == input && event.key == 'Enter' && !event.shiftKey) sendChat();
});

function clickPopup() {
  document.getElementById("popupContainer").style.right = "-100px";
  window.open('bookings', '_blank');
}