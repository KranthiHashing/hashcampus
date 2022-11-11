const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { contactUs } = require("./controller.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static('./static/'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/contact.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/privacy", (req, res) => {
    res.sendFile(__dirname + "/privacy.html");
});

app.post('/', contactUs);

const PORT = process.env.PORT || 8080;
const host = '0.0.0.0';
app.listen(PORT, host, () => {
    console.log(`Server is running on port ${PORT}.`);
});