const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", {
        msg: input.value,
        id: socket.id
    });

        addMessage(input.value, "sent");

        input.value = "";
    }
});

socket.on("chat message", (data) => {
    if (data.id !== socket.id) {
        addMessage(data.msg, "received");
    }
});

function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.textContent = text;

    messages.appendChild(div);

    // Auto scroll
    messages.scrollTop = messages.scrollHeight;
}