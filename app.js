const app = require("express") ();
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "ba078f4cff050a",
    password: "2ac694ea",
    database: "heroku_8afbad23634f9c6"
});

const PORT = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.send("Welcome to our SAP Hackathon App!");
    connection.query(`INSERT INTO customers (id, email, name, active) VELUES (null, ?, ?, ?)`, ["abc.gmail.com", "gabe", "1"], (error, results) => {
        if (error) console.log(error);
    });
});

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});