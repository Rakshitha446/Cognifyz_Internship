const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    res.render("success", { name, email });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});