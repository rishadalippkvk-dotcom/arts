const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const programRoutes = require('./routes/programRoutes');
const fixtureRoutes = require('./routes/fixtureRoutes');

app.use('/api/programs', programRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/results', require('./routes/resultRoutes'));

// Debugging route to verify server is alive
app.get('/debug', (req, res) => {
    res.json({
        status: 'Server is running',
        port: PORT,
        mongodb_config: process.env.MONGODB_URI ? 'Present' : 'Missing',
        is_placeholder: process.env.MONGODB_URI?.includes('<username>') ? 'YES (Fix your .env file!)' : 'No'
    });
});

app.get('/', (req, res) => {
    res.send('Sports API is running... Open /debug to check status.');
});

// Database Connection
if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('<username>')) {
    console.warn('\n⚠️  WARNING: You are using a placeholder MONGODB_URI. This will NOT work.');
    console.warn('Please update your .env file with your real connection string from MongoDB Atlas.\n');
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error('Check if your IP is whitelisted in MongoDB Atlas and your password is correct.');
    });

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`Try opening http://localhost:${PORT}/debug in your browser.`);
});
