const Result = require('../models/Result');

exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createResult = async (req, res) => {
    const result = new Result(req.body);
    try {
        const newResult = await result.save();
        res.status(201).json(newResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateResult = async (req, res) => {
    try {
        const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteResult = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Result deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
