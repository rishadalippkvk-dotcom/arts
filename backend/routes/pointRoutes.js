const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');

router.get('/', pointController.getAllPoints);
router.post('/', pointController.createPoint);
router.put('/:id', pointController.updatePoint);
router.delete('/:id', pointController.deletePoint);

module.exports = router;
