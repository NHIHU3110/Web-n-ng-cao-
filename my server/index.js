const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");
const cors = require('cors');
const fs = require('fs');

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const dbPath = path.join(__dirname, 'database.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
    const initialData = [
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
    ];
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf8');
}

// Helper to load database
function loadDatabase() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading database:", err);
        return [];
    }
}

// Helper to save database
function saveDatabase(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Error saving database:", err);
    }
}

// API Routes
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

app.get("/books", (req, res) => {
    const database = loadDatabase();
    res.send(database);
});

app.get("/books/:id", (req, res) => {
    const database = loadDatabase();
    const id = req.params["id"];
    const p = database.find(x => x.BookId === id);
    if (p) {
        res.send(p);
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

app.post("/books", (req, res) => {
    const database = loadDatabase();
    const newBook = req.body;

    // Simple validation
    if (!newBook.BookId || !newBook.BookName) {
        return res.status(400).send({ message: "BookId and BookName are required" });
    }

    // Check for duplicate ID
    if (database.some(b => b.BookId === newBook.BookId)) {
        return res.status(400).send({ message: "BookId already exists" });
    }

    database.push(newBook);
    saveDatabase(database);
    res.send(database);
});

app.put("/books", (req, res) => {
    const database = loadDatabase();
    const updatedBook = req.body;

    const index = database.findIndex(x => x.BookId === updatedBook.BookId);
    if (index !== -1) {
        database[index] = updatedBook;
        saveDatabase(database);
        res.send(database);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.delete("/books/:id", (req, res) => {
    const database = loadDatabase();
    const id = req.params["id"];

    const index = database.findIndex(x => x.BookId === id);
    if (index !== -1) {
        database.splice(index, 1);
        saveDatabase(database);
        res.send(database); // Return updated list
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.listen(port, () => {
    console.log(`K234111441 is running at http://localhost:${port}`);
});

module.exports = app;