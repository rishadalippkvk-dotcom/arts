const Point = require('../models/Point');

exports.getAllPoints = async (req, res) => {
    try {
        const points = await Point.find().sort({ total: -1 });
        res.status(200).json(points);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPoint = async (req, res) => {
    const point = new Point(req.body);
    try {
        const newPoint = await point.save();
        res.status(201).json(newPoint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePoint = async (req, res) => {
    try {
        const updatedPoint = await Point.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPoint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePoint = async (req, res) => {
    try {
        await Point.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Point entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
