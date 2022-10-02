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
const {
    JSDOM
} = jsdom;
const fs = require("fs");

app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

const io = require("socket.io")(server);
const sharedsession = require("express-socket.io-session");
io.use(sharedsession(session));
io.on("connection", socket => {
    let session = socket.handshake.session;
    socket.on("postChat", (message) => {
        io.emit("updateChat", message, session.username);
        pool.query(`INSERT INTO chat_messages VALUES (NULL, ?, ?, ?)`, [session.room, session.username, message], (error) => {
            if (error) console.log(error);
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
    res.send(renderPage("index"));
});

app.get("/bookings", (req, res) => {
    res.send(renderPage("bookings"));
});

/* ----- login ----- */
app.post("/login", function (req, res) {
    console.log(req);
    console.log(req.body.username + ", " + req.body.password);
    pool.query(`SELECT * FROM users WHERE user_name = ? AND password = ?;`,
        [req.body.username, req.body.password],
        function (error, results) {
            if (error || !results || !results.length) {
                console.log("error!");
                if (error) console.log(error);
                res.send({
                    status: "fail",
                    msg: "User account not found."
                });
            } else {
                console.log("good!");
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
                req.session.inPerson = req.body.inPerson;

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

/* ----- profile ----- */
app.get("/profile", function (req, res) {
    // check for a session first!
    if (req.session.loggedIn) {

        let profileDOM = wrap("./app/html/profile.html", req.session);

        // profileDOM.window.document.getElementsByTagName("title")[0].innerHTML = req.session.username + "'s Profile";
        profileDOM.window.document.getElementById("picture_src").src = "/img/circle-avatar.jpg";
        profileDOM.window.document.getElementById("first_name").innerHTML = req.session.username;
        profileDOM.window.document.getElementById("last_name").innerHTML = req.session.lastname;
        profileDOM.window.document.getElementById("office_location").innerHTML = req.session.location;
        profileDOM.window.document.getElementById("department").innerHTML = req.session.department;

        res.set("Server", "SAP Engine");
        res.set("X-Powered-By", "SAP");
        res.send(profileDOM.serialize());

    } else {
        // not logged in - no session and no access, redirect to home!
        if (req.session.isGuest) req.session.destroy((error) => {
            if (error) res.status(400).send("Unable to log out");
        });
        res.redirect("/");
    }
});

app.get("/room", (req, res) => {
    res.send(renderPage("room"));
});

server.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});

app.get("/showEvent", (req, res) => {
    let eventResult;
    let newAttendees;

    pool.query(`SELECT * from users ORDER BY rand();`), (error, results1) => {
        if (error) console.log(error);
        newAttendees = results1[0];
    };

    if (req.session.inOffice = 0) {
        pool.query(`SELECT * FROM events WHERE event_type = 'online' ORDER BY rand();`, (error, results2) => {
            if (error) console.log(error);
            eventResult = results2[0];
        });
    } else {
        pool.query(`SELECT * FROM events WHERE event_type = 'in-person' ORDER BY rand();`, (error, results2) => {
            if (error) console.log(error);
            eventResult = results2[0];
        });
    }
    pool.query(`SELECT * FROM all_locations WHERE location_ID = ?;`, [eventResult.event_location], (error, results3) => {
        if (error) console.log(error);
        newLocation = results3[0];
    });

    res.send({
        newLocation: newLocation.location_name,
        newType: eventResult.event_tpe,
        newSubject: eventResult.event_subject,
        newAttendees: newAttendees.user_name
    });
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