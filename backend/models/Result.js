const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    programName: { type: String, required: true },
    house: { type: String, required: true }, // e.g., ASTRA, EAKHA, LOKHA
    grade: { type: String, required: true }, // A, B, C
    points: { type: Number, required: true },
    type: { type: String, default: 'Individual', enum: ['Individual', 'Group'] }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
