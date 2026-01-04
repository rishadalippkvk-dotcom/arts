const Fixture = require('../models/Fixture');

exports.getAllFixtures = async (req, res) => {
    try {
        const fixtures = await Fixture.find().sort({ createdAt: -1 });
        res.status(200).json(fixtures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createFixture = async (req, res) => {
    const fixture = new Fixture(req.body);
    try {
        const newFixture = await fixture.save();
        res.status(201).json(newFixture);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateFixture = async (req, res) => {
    try {
        const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedFixture);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteFixture = async (req, res) => {
    try {
        await Fixture.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Fixture deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
