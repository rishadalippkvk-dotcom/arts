const Program = require('../models/Program');

exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProgram = async (req, res) => {
    const program = new Program(req.body);
    try {
        const newProgram = await program.save();
        res.status(201).json(newProgram);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProgram = async (req, res) => {
    try {
        const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProgram);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProgram = async (req, res) => {
    try {
        await Program.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Program deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
