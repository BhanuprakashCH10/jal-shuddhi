const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ["https://jal-shuddhi.vercel.app", "http://localhost:5173"], // Allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// --- KEY FIX: Database Connection Function ---
let isConnected = false; // Track connection status

const connectDB = async () => {
    if (isConnected) return; // If already connected, skip
    
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "jalshuddhi" // Explicitly specify DB name
        });
        isConnected = db.connections[0].readyState;
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        throw error; // Stop the server if DB fails
    }
};

// Routes
app.get('/', (req, res) => {
    res.send("Jal Shuddhi Backend is Running!");
});

app.use('/api/auth', async (req, res, next) => {
    await connectDB(); // Wait for DB before handling auth
    next();
}, require('./routes/auth'));

app.use('/api/reports', async (req, res, next) => {
    await connectDB(); // Wait for DB before handling reports
    next();
}, require('./routes/reports'));

// Export for Vercel
module.exports = app;

// Local Development
if (require.main === module) {
    connectDB().then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
    });
}