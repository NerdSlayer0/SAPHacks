const express = require("express");
const app = express();
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const mysql = require("mysql2");
const pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "ba078f4cff050a",
    password: "2ac694ea",
    database: "heroku_8afbad23634f9c6"
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

/* ----- login ----- */
app.post("/login", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    connection.query(`SELECT * FROM users WHERE user_name = ? AND password = ?`,
        [req.body.username, req.body.password],
        function (error, results) {
            if (error || !results || !results.length) {
                if (error) console.log(error);
                res.send({
                    status: "fail",
                    msg: "User account not found."
                });
            } else {
                // user authenticated, create a session
                req.session.loggedIn = true;
                req.session.lastname = results[0].last_name;
                req.session.name = results[0].user_name;
                req.session.userID = results[0].ID;
                req.session.username = results[0].first_name;
                // req.session.isAdmin = results[0].is_admin;
                // req.session.userImage = results[0].user_image;
                req.session.pass = results[0].password;
                req.session.location = results[0].office_location;
                req.session.alertCount = results[0].alert_count;
                req.session.workCount = results[0].work_count;
                req.session.department = results[0].department;
                //req.session.isGuest = false;

                req.session.save((error) => {
                    if (error) console.log(error);
                });

                // all we are doing as a server is telling the client that they
                // are logged in, it is up to them to switch to the profile page
                res.send({
                    status: "success",
                    msg: "Logged in.",
                    isAdmin: (results[0].is_admin == 1)
                });
            }
        });
});

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});
