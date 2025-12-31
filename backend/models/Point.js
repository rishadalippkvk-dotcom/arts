const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    rank: { type: Number },
    department: { type: String, required: true },
    gold: { type: Number, default: 0 },
    silver: { type: Number, default: 0 },
    bronze: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Point', pointSchema);
