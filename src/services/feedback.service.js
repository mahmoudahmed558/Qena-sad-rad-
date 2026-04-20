const Feedback = require('../models/feedback.model');
const Place = require('../models/place.model');


exports.createFeedbackService = async (data, userId) => {
    const { message, rating, placeId } = data;

    const existing = await Feedback.findOne({
        user: userId,
        place: placeId
    });

    if (existing) {
        throw new Error('Already rated');
    }

    const feedback = await Feedback.create({
        message,
        rating,
        user: userId,
        place: placeId
    });

    const stats = await Feedback.aggregate([
        { $match: { place: placeId } },
        {
        $group: {
            _id: '$place',
            avgRating: { $avg: '$rating' },
            count: { $sum: 1 }
        }
        }
    ]);

    await Place.findByIdAndUpdate(placeId, {
        avgRating: stats[0]?.avgRating || 0,
        ratingsCount: stats[0]?.count || 0
    });

    return feedback;
};