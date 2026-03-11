const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let fashionCollection;

async function startServer() {
    try {
        await client.connect();
        const database = client.db("FashionData");
        fashionCollection = database.collection("Fashion");
        console.log("Connected to MongoDB -> FashionData database");

        // Initialize sample data if collection is empty
        const count = await fashionCollection.countDocuments();
        if (count === 0) {
            console.log("Initializing sample Fashion data...");
            const sampleData = [
                {
                    title: "Classic White T-Shirt",
                    details: "<p>A timeless classic. 100% cotton, breathable, and comfortable for everyday wear.</p>",
                    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
                    Style: "Casual",
                    created_at: new Date()
                },
                {
                    title: "Denim Jacket",
                    details: "<p>Vintage wash denim jacket with button closures and side pockets.</p>",
                    thumbnail: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format&fit=crop&q=60",
                    Style: "Casual",
                    created_at: new Date(Date.now() - 86400000)
                },
                {
                    title: "Comfort Sneakers",
                    details: "<p>Lightweight sneakers with memory foam insoles for all-day comfort.</p>",
                    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
                    Style: "Casual",
                    created_at: new Date(Date.now() - 172800000)
                },
                {
                    title: "Elegant Evening Gown",
                    details: "<p>Stunning floor-length gown with intricate sequin detailing.</p>",
                    thumbnail: "https://picsum.photos/seed/gown/500/600",
                    Style: "Formal",
                    created_at: new Date(Date.now() - 259200000)
                },
                {
                    title: "Tailored Suit Jacket",
                    details: "<p>Slim-fit suit jacket in a versatile navy blue, perfect for professional settings.</p>",
                    thumbnail: "https://picsum.photos/seed/suit/500/600",
                    Style: "Formal",
                    created_at: new Date(Date.now() - 345600000)
                },
                {
                    title: "Silk Tie",
                    details: "<p>100% silk tie featuring a subtle geometric pattern.</p>",
                    thumbnail: "https://picsum.photos/seed/tie/500/600",
                    Style: "Formal",
                    created_at: new Date(Date.now() - 432000000)
                },
                {
                    title: "Running Shorts",
                    details: "<p>Breathable, moisture-wicking shorts designed for high-performance workouts.</p>",
                    thumbnail: "https://picsum.photos/seed/shorts/500/600",
                    Style: "Sport",
                    created_at: new Date(Date.now() - 518400000)
                },
                {
                    title: "Compression Shirt",
                    details: "<p>Long-sleeve compression shirt that supports muscles and improves circulation.</p>",
                    thumbnail: "https://picsum.photos/seed/shirt/500/600",
                    Style: "Sport",
                    created_at: new Date(Date.now() - 604800000)
                },
                {
                    title: "Sport Water Bottle",
                    details: "<p>Insulated stainless steel water bottle, keeps drinks cold for 24 hours.</p>",
                    thumbnail: "https://picsum.photos/seed/bottle/500/600",
                    Style: "Sport",
                    created_at: new Date(Date.now() - 691200000)
                }
            ];
            await fashionCollection.insertMany(sampleData);
            console.log("Sample Fashion data inserted successfully.");
        }

        app.listen(port, () => {
            console.log(`server-fashion API listening on port ${port}`);
        });

    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

startServer();

// ==========================================
// API ROUTES
// ==========================================

// 1. Get all Fashions, sorted by creation date descending
app.get("/fashions", async (req, res) => {
    try {
        const result = await fashionCollection.find({}).sort({ created_at: -1 }).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fashions", error });
    }
});

// 2. Lấy danh sách style để làm filter dropdown
app.get("/fashions/styles", async (req, res) => {
    try {
        const styles = await fashionCollection.distinct("Style");
        res.json(styles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching styles", error });
    }
});

// 3. Get Fashions by Style
app.get("/fashions/style/:style", async (req, res) => {
    try {
        const style = req.params.style;
        const result = await fashionCollection.find({ Style: style }).sort({ created_at: -1 }).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching fashions by style", error });
    }
});

// 4. Get a single Fashion by ID
app.get("/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const result = await fashionCollection.findOne({ _id: new ObjectId(id) });
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: "Fashion not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching fashion details", error });
    }
});

// 5. Add a new Fashion
app.post("/fashions", async (req, res) => {
    try {
        const newFashion = req.body;
        newFashion.created_at = new Date(); // Ensure creation date is set
        const result = await fashionCollection.insertOne(newFashion);
        res.status(201).json({ message: "Fashion created successfully", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating fashion", error });
    }
});

// 6. Edit a Fashion
app.put("/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const updatedFashion = req.body;
        // Preclude _id from being updated if it's in the body
        delete updatedFashion._id;

        const result = await fashionCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFashion }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Fashion not found" });
        }
        res.json({ message: "Fashion updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating fashion", error });
    }
});

// 7. Delete a Fashion
app.delete("/fashions/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const result = await fashionCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Fashion not found" });
        }
        res.json({ message: "Fashion deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting fashion", error });
    }
});
