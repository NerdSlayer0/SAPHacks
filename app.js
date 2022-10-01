const express = require("express");
const app = express();
const server = require("http").createServer(app);
const session = require("express-session")({
    secret: "secret",
    resave: true,
    saveUninitialized: true
});
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const mysql = require("mysql2");
const pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "ba078f4cff050a",
    password: "2ac694ea",
    database: "heroku_8afbad23634f9c6"
});

const io = require("socket.io")(server);
const sharedsession = require("express-socket.io-session");
io.use(sharedsession(session));
io.on("connection", socket => {
    let session = socket.handshake.session;
    socket.on("postComment", (message, room) => {
        pool.query(``, [], (error) => {
            if (error) console.log(error);
            else io.to(room).emit("updateComment", session.username + ": " + message);
        });
    });
});

function renderPage(htmlFileName) {
    let template = new JSDOM(fs.readFileSync(__dirname + "/view/template.html", "utf8"));
    template.window.document.getElementById("content").innerHTML = fs.readFileSync(`${__dirname}/view/${htmlFileName}.html`, "utf8");
    return template.serialize();
}

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(renderPage("main"));
});

app.get("/bookings", (req, res) => {
    res.send(renderPage("bookings"));
});

app.get("/room", (req, res) => {
    res.send(renderPage("room"));
});

server.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});
