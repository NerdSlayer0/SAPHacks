const socket = io();

function sendChat() {
  const input = document.getElementById("chatContent");
  const message = input.value.trim();
  if (message) socket.emit("postChat", message);
  input.value = "";
  const list = document.getElementById("chatList");
  list.scrollTop = list.scrollHeight;
}

socket.on("updateChat", (message) => {
  postChat(message);
});

function postChat(message) {
  let template = document.getElementById("newChat").content.cloneNode(true);
  template.querySelector(".chatContent").innerHTML = message;
  document.getElementById("chatList").appendChild(template);
}

window.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    sendChat();
  }
});