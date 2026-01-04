const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
    sport: { type: String, required: true },
    round: { type: String, required: true },
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    scoreA: { type: String, default: '-' },
    scoreB: { type: String, default: '-' },
    status: { type: String, default: 'Upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Fixture', fixtureSchema);
