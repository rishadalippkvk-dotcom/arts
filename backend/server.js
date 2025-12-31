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
const pointRoutes = require('./routes/pointRoutes');

app.use('/api/programs', programRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/points', pointRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Sports API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
