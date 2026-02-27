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

app.listen(port, () => {
    console.log(`My Server listening on port ${port}`)
})

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})

// ============================================
// Kết nối MongoDB
// ============================================
const { MongoClient, ObjectId } = require('mongodb');         // Line 23: Gọi thư viện mongodb
client = new MongoClient("mongodb://127.0.0.1:27017");        // Line 24: Khai báo connection string
client.connect();                                              // Line 25: Gọi lệnh connect đến Server
database = client.db("FashionData");                          // Line 26: Kết nối đến Database "FashionData"
fashionCollection = database.collection("Fashion");           // Line 27: Lấy collection Fashion

// ============================================
// API: GET /fashions - Lấy toàn bộ danh sách Fashion
// ============================================
app.get("/fashions", cors(), async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result)
})
