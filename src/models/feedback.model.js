const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },

    avgRating: {
        type: Number,
        default: 0
},
    ratingsCount: {
        type: Number,
        default: 0
}


}, { timestamps: true });

feedbackSchema.index({ user: 1, place: 1 }, { unique: true });
module.exports = mongoose.model('Feedback', feedbackSchema);