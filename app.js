const express = require("express");
const app = express();
const path = require('path');
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
const fs = require("fs");

const mysql = require("mysql2");
const {
    connect
} = require("http2");
const pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "ba078f4cff050a",
    password: "2ac694ea",
    database: "heroku_8afbad23634f9c6"
});

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});

app.get("/showEvent", (req, res) => {
    if (req.session.inOffice = 0) {
        pool.query(`SELECT * FROM events WHERE event_type = 'online' ORDER BY rand();`, (error, results) => {
            if (error) console.log(error);
            res.send({
                newEvent: results[0].event_location,
                newType: results[0].event_type,
                newSubject: results[0].event_subject
            });
        });
    } else {
        pool.query(`SELECT * FROM events WHERE event_type = 'in-person' ORDER BY rand();`, (error, results) => {
            if (error) console.log(error);
            res.send({
                newEvent: results[0].event_location,
                newType: results[0].event_type,
                newSubject: results[0].event_subject
            });
        });
    }
});

//^^ This stuff goes here
// app.get("/schedule", (req, res) => {
//     connection.query('SELECT * FROM locations ;', function (error, results, fields) {
//     if (error) {
//       console.log(error);
//     }
//     console.log('Rows returned are: ', results);
//     res.send({
//       status: "success",
//       rows: results
//     });
//   });
// })