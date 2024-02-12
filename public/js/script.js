const socket = io();

const login = document.querySelector(".login");
const loginForm = login.querySelector(".loginForm");
const loginInput = login.querySelector(".loginInput");

const chat = document.querySelector(".chat");
const chatMessages = chat.querySelector(".chatMessages");
const chatForm = chat.querySelector(".chatForm");
const chatInput = chat.querySelector(".chatInput");

const user = {
  id: "",
  name: "",
  color: "",
};

const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


socket.on("returnMessage", (message) => {
  prossessMessage(message);
});

socket.on('welcome', (serverState) => {
    let messages = [...serverState]

    for (let i = 0; i < messages.length; i++) {
      prossessMessage(messages[i])
   
    }
    
})

const prossessMessage = (message) => {
  const div = document.createElement("div");
  if (message) {
    if (message.userId === user.id) {
      div.className = "messageSelf";
      div.innerText = message.content;

      chatMessages.appendChild(div);
    } else {
      const span = document.createElement("span");
      div.className = "messageOther";
      span.className = "messageSender";

      div.appendChild(span);

      span.innerHTML = message.userName;
      div.innerHTML += message.content;

      chatMessages.appendChild(div);
    }
  }
};

const handleLogin = (e) => {
  e.preventDefault();

  user.id = crypto.randomUUID();
  user.name = loginInput.value;
  user.color = getRandomColor();

  login.style.display = "none";
  chat.style.display = "flex";

};

const sendMessage = (e) => {
  e.preventDefault();

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value,
  };

  socket.emit("message", message);

  chatInput.value = "";
};

loginForm.addEventListener("submit", handleLogin);

chatForm.addEventListener("submit", sendMessage);
