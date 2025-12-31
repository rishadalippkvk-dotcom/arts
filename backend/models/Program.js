const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    sport: { type: String, required: true },
    venue: { type: String, required: true },
    category: { type: String, default: 'Group' },
    status: { type: String, default: 'Upcoming', enum: ['Upcoming', 'Ongoing', 'Completed'] }
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
