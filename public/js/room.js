const socket = io();

let code = 4;

function sendChat() {
  const input = document.getElementById("commentContent");
  const message = input.value.trim();
  if (message) socket.emit("postComment", message, code);
  input.value = "";
  const list = document.getElementById("commentList");
  list.scrollTop = list.scrollHeight;
}

socket.on("updateComment", (message) => {
  postComment(message);
});

function postComment(message) {
  let template = document.getElementById("newComment").content.cloneNode(true);
  template.querySelector(".commentContent").innerHTML = message;
  document.getElementById("commentList").appendChild(template);
}