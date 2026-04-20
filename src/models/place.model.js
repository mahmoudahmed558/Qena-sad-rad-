// src/models/place.model.js
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, index: true },
    description: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number] // [lng, lat]
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
placeSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Place', placeSchema);
