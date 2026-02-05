const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));

const cors = require('cors');
app.use(cors());

//CREATE API HOME//
app.get("/", (req, res) => {
    res.send("Welcome to <font color='red'> Nhi Huynh </font> server")
});
app.get('/about', (req, res) => {
    let tbl = "<table border='1'>";
    tbl += "<tr><th colspan='2'>About Me</th></tr>";
    tbl += "<tr><td>Name</td><td>Nhi Huynh</td></tr>";
    tbl += "<tr><td>Class</td><td>K234112E</td></tr>";
    tbl += "<tr><td colspan='2' style='text-align:center; padding:10px;'>" +
        "<img src='images/avatar.jpg' style='width:120px; height:120px; object-fit:cover; border-radius:50%;' />" +
        "</td></tr>";
    tbl += "</table>";
    res.send(tbl);
});

app.listen(port, () => {
    console.log(`K234111441 is running at http://localhost:${port}`);
});

module.exports = app;

let database = [
    {
        "BookId": "b1", "BookName": "Kỹ thuật lập trình cơ bản",
        "Price": 70, "Image": "images/img7993-17086753132761104772518.jpg.webp"
    },
    {
        "BookId": "b2", "BookName": "Kỹ thuật lập trình nâng cao",
        "Price": 100, "Image": "images/n9hTkOhYC-Ow_nNOlHNjkH-NVYB4LjiwVbgmQgU2W3I.jpg.webp"
    },
    { "BookId": "b3", "BookName": "Máy học cơ bản", "Price": 200, "Image": "images/bob-brewer-daC7ji1EMHM-unsplash.jpg" },
    { "BookId": "b4", "BookName": "Máy học nâng cao", "Price": 300, "Image": "images/capybara-15-jpg-1735886486-1735893396-1735893768.jpg.webp" },
    { "BookId": "b5", "BookName": "Lập trình Robot cơ bản", "Price": 250, "Image": "images/chim-hong-hac3-1491813259646.jpg.webp" },
]
app.get("/books", (req, res) => {
    res.send(database);
});