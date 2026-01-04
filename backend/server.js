const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const programRoutes = require('./routes/programRoutes');
const fixtureRoutes = require('./routes/fixtureRoutes');
const resultRoutes = require('./routes/resultRoutes');

app.use('/api/programs', programRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/results', resultRoutes);

// Debug route
app.get('/debug', (req, res) => {
    res.json({
        status: 'Server is running',
        mongodb_config: process.env.MONGODB_URI ? 'Present' : 'Missing'
    });
});

// Root route (stops 404)
app.get('/', (req, res) => {
    res.send('Sports API is running');
});

// MongoDB connection (IMPORTANT: cache connection)
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI)
            .then(m => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

connectDB()
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err.message));

// 👇 THIS replaces app.listen
module.exports = app;
