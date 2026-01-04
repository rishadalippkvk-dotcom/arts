const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    sport: { type: String, required: true },
    venue: { type: String, required: true },
    status: { type: String, default: 'Upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
