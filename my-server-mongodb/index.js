const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan")
app.use(morgan("combined"))

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors())

// Exercise 60: Cookie Parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// ============================================
// Kết nối MongoDB
// ============================================
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
let fashionCollection;

async function startServer() {
    try {
        await client.connect();
        const database = client.db("FashionData");
        fashionCollection = database.collection("Fashion");
        console.log("Connected to MongoDB Fashion Collection");

        app.listen(port, () => {
            console.log(`My Server listening on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

startServer();

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB");
});

// ============================================
// API: GET /fashions - Lấy toàn bộ danh sách Fashion
// ============================================
app.get("/fashions", cors(), async (req, res) => {
    try {
        if (!fashionCollection) return res.status(503).send({ message: "Database not ready" });
        const result = await fashionCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error("Error fetching fashions:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("/fashions/:id", cors(), async (req, res) => {
    try {
        const id = req.params["id"];
        // Kiểm tra xem id có đúng định dạng ObjectId 24 ký tự hex của MongoDB không
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        var o_id = new ObjectId(id);
        const result = await fashionCollection.find({ _id: o_id }).toArray();

        if (result && result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send({ message: "Fashion not found" });
        }
    } catch (error) {
        console.error("Error fetching fashion details:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// ============================================
// Exercise 60: Cookie APIs
// ============================================

// Step 3: Create Cookie - single data and JsonObject data
app.get("/create-cookie", cors(), (req, res) => {
    res.cookie("username", "tranduythanh");
    res.cookie("password", "123456");
    var account = { "username": "tranduythanh", "password": "123456" };
    res.cookie("account", account);
    // Cookies with timeout
    res.cookie("infor_limit1", 'I am limited Cookie - way 1', { expires: new Date(Date.now() + 360000) });
    res.cookie("infor_limit2", 'I am limited Cookie - way 2', { maxAge: 360000 });
    res.send("cookies are created");
});

// Step 4 & 5: Read Cookie
app.get("/read-cookie", cors(), (req, res) => {
    var username = req.cookies.username;
    var password = req.cookies.password;
    var account  = req.cookies.account;
    var infor = "username = " + username + "<br/>";
    infor += "password = " + password + "<br/>";
    if (account != null) {
        infor += "account.username = " + account.username + "<br/>";
        infor += "account.password = " + account.password + "<br/>";
    }
    infor += "infor_limit1 = " + req.cookies.infor_limit1 + "<br/>";
    infor += "infor_limit2 = " + req.cookies.infor_limit2 + "<br/>";
    res.send(infor);
});

// Step 6: Clear Cookie
app.get("/clear-cookie", cors(), (req, res) => {
    res.clearCookie("account");
    res.send("[account] Cookie is removed");
});

// ============================================
// Exercise 61: Cookie Login API
// ============================================
let userCollection;

// Connect to User collection after startServer completes
async function initUserCollection() {
    try {
        const client2 = new MongoClient("mongodb://127.0.0.1:27017");
        await client2.connect();
        const db2 = client2.db("FashionData");
        userCollection = db2.collection("User");
        console.log("Connected to User collection (Ex61)");
    } catch(e) {
        console.error("User collection init error:", e);
    }
}
initUserCollection();

// POST /login - Check credentials and save cookie
app.post("/login-ex61", cors(), async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (!userCollection) return res.status(503).json({ message: "DB not ready" });
    var user = await userCollection.findOne({ username: username, password: password });
    if (user) {
        res.cookie("saved_username", username);
        res.cookie("saved_password", password);
        res.json({ message: "Login successful", user: { username: user.username } });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// GET /read-login-cookie - Read saved login cookie
app.get("/read-login-cookie", cors(), (req, res) => {
    res.json({
        username: req.cookies.saved_username || "",
        password: req.cookies.saved_password || ""
    });
});
