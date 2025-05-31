const express = require('express');
const router = express.Router();

const stationControllers = require('../controllers/stationControllers.js');

router.get('/', stationControllers.getAllStations);
router.get('/:id', stationControllers.getStationById);
router.post('/', stationControllers.createStation);
router.patch('/:id', stationControllers.updateStation);
router.delete('/:id', stationControllers.deleteStation);

module.exports = router;