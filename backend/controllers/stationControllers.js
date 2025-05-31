const Station = require('../models/Station.js');
const stationValidator = require('../validators/stationValidator.js');

// Get all stations
const getAllStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stations', error });
    }
}

// Get station by ID
const getStationById = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await Station.findById(id);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching station', error });
    }
}

// Create a new station
const createStation = async (req, res) => {
    // Validate the station data
    const { error } = stationValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const newStation = new Station(req.body);
        await newStation.save();
        res.status(201).json(newStation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating station', error });
    }
}

// Update a station
const updateStation = async (req, res) => {
    const { id } = req.params;
    // Validate the updated station data
    const { error } = stationValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updatedStation = await Station.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStation) {
            return res.status(404).json({ message: 'Station not found' });
        }
        res.status(200).json(updatedStation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating station', error });
    }
}

// Delete a station
const deleteStation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStation = await Station.findByIdAndDelete(id);
        if (!deletedStation) {
            return res.status(404).json({ message: 'Station not found' });
        } 
        res.status(200).json({ message: 'Station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting station', error });
    }
}

module.exports = {
    getAllStations,
    getStationById,
    createStation,
    updateStation,
    deleteStation
};