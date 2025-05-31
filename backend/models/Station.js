const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0], // Default coordinates (longitude, latitude)
            required: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    powerOutput: {
        type: Number,
        default: 0 // Default power output in kW
    },
    connecterType: {
        type: String,
        enum: ['Type1', 'Type2', 'CCS', 'CHAdeMO', 'Tesla'],
        default: 'Type2' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;