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