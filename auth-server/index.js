const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3003;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'FashionData';
const collectionName = 'Users';
const transactionCollectionName = 'Transactions';
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

let db, usersCollection, transactionsCollection;

// Connect to MongoDB and Migrate data
async function startServer() {
    try {
        const client = await MongoClient.connect(mongoUrl);
        db = client.db(dbName);
        usersCollection = db.collection(collectionName);
        transactionsCollection = db.collection(transactionCollectionName);
        console.log('Connected to MongoDB Auth & Transactions');

        // Migration from users.json to MongoDB
        if (fs.existsSync(USERS_FILE)) {
            try {
                const fileData = fs.readFileSync(USERS_FILE);
                const users = JSON.parse(fileData);
                if (users.length > 0) {
                    console.log(`Found ${users.length} users in users.json. Checking migration...`);
                    for (const user of users) {
                        const exists = await usersCollection.findOne({ email: user.email });
                        if (!exists) {
                            await usersCollection.insertOne(user);
                            console.log(`Migrated user: ${user.email}`);
                        }
                    }
                }
            } catch (fsErr) {
                console.error('Migration error:', fsErr);
            }
        }

        app.listen(port, () => {
            console.log(`Auth Server listening on port ${port}`);
        });
    } catch (err) {
        console.error('Critical Server Start Error:', err);
        process.exit(1);
    }
}

startServer();

app.get('/', (req, res) => {
    res.send('Auth Server (MongoDB) is running');
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email, password });

        if (user) {
            res.status(200).json({ message: 'Login successful', user: { email: user.email, name: user.name } });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = { name, email, password };
        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email, name: newUser.name } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Process Payment
app.post('/process-payment', async (req, res) => {
    try {
        const { userEmail, userName, amount, items, customerInfo, paymentMethod, status } = req.body;

        const transactionId = (paymentMethod === 'COD' ? 'TRX' : 'MOMO') + Date.now() + Math.floor(Math.random() * 1000);

        const newTransaction = {
            userEmail,
            userName,
            amount,
            items,
            customerInfo,
            paymentMethod,
            status: status || 'PENDING',
            transactionId,
            createdAt: new Date()
        };

        const result = await transactionsCollection.insertOne(newTransaction);
        console.log('Transaction saved:', transactionId);
        res.status(200).json({ message: 'Payment processed successfully', transactionId });
    } catch (err) {
        console.error('Error processing payment:', err);
        res.status(500).json({ message: 'Internal Server Error during payment' });
    }
});

// Admin Stats endpoint
app.get('/admin/stats', async (req, res) => {
    try {
        const totalOrders = await transactionsCollection.countDocuments();
        const totalCustomers = await usersCollection.countDocuments();

        // Calculate total revenue
        const transactions = await transactionsCollection.find({}).toArray();
        const totalRevenue = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

        res.status(200).json({
            totalOrders,
            totalCustomers,
            totalRevenue
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

// Admin Chart Stats (Revenue per day for last 7 days)
app.get('/admin/chart-stats', async (req, res) => {
    try {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() - i);
            last7Days.push({
                date: d.toLocaleDateString('en-CA'), // YYYY-MM-DD local
                label: d.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' }),
                revenue: 0
            });
        }

        const transactions = await transactionsCollection.find({
            status: 'SUCCESS',
            createdAt: { $gte: new Date(last7Days[0].date) }
        }).toArray();

        transactions.forEach(tx => {
            const txDate = new Date(tx.createdAt).toLocaleDateString('en-CA'); // YYYY-MM-DD local
            const daySlot = last7Days.find(d => d.date === txDate);
            if (daySlot) {
                daySlot.revenue += (Number(tx.amount) || 0);
            }
        });

        res.status(200).json(last7Days);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching chart stats' });
    }
});

// Admin Orders list
app.get('/admin/orders', async (req, res) => {
    try {
        const orders = await transactionsCollection.find({}).sort({ createdAt: -1 }).toArray();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Update Order Status
app.patch('/admin/orders/:transactionId/status', async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;
        await transactionsCollection.updateOne(
            { transactionId: transactionId },
            { $set: { status: status } }
        );
        res.status(200).json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating status' });
    }
});

// Admin Customers list
app.get('/admin/customers', async (req, res) => {
    try {
        const customers = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
        // Fallback for createdAt if it doesn't exist
        const customersWithDate = customers.map(u => ({
            ...u,
            createdAt: u._id ? u._id.getTimestamp() : new Date()
        }));
        res.status(200).json(customersWithDate);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers' });
    }
});

// ... (existing code)

// ============================================
// Exercise 61: Cookie Login Save/Read
// ============================================

// Save login cookie after successful login
app.post('/save-login-cookie', (req, res) => {
    const { email, password } = req.body;
    res.cookie("saved_email", email, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
    res.cookie("saved_password", password, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ message: "Cookie saved" });
});

// Read saved login cookie
app.get('/read-login-cookie', (req, res) => {
    res.json({
        email: req.cookies.saved_email || "",
        password: req.cookies.saved_password || ""
    });
});

// Clear login cookie
app.get('/clear-login-cookie', (req, res) => {
    res.clearCookie("saved_email");
    res.clearCookie("saved_password");
    res.json({ message: "Login cookies cleared" });
});
