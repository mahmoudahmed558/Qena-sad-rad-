const Feedback = require('../models/feedback.model');

// create feedback
exports.createFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.createFeedbackService(
            req.body,
            req.user.id
        );
        
        res.status(201).json(feedback);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get all feedbacks 
exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
        .populate('user', 'name email')
        .populate('place', 'name');

        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get feedbacks for specific place
exports.getPlaceFeedbacks = async (req, res) => {
try {
    const feedbacks = await Feedback.find({ place: req.params.placeId })
    .populate('user', 'name');

    res.json(feedbacks);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};


exports.updateFeedback = async (req, res) => {
    try {
        const { rating, message } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be 1-5' });
        }

        const feedback = await Feedback.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { rating, message },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // recalc avg
        const stats = await Feedback.aggregate([
            { $match: { place: feedback.place } },
            {
                $group: {
                _id: '$place',
                avgRating: { $avg: '$rating' },
                count: { $sum: 1 }
                }
            }
        ]);

        await Place.findByIdAndUpdate(feedback.place, {
            avgRating: stats[0]?.avgRating || 0,
            ratingsCount: stats[0]?.count || 0
        });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // recalc avg
        const stats = await Feedback.aggregate([
            { $match: { place: feedback.place } },
            {
                $group: {
                _id: '$place',
                avgRating: { $avg: '$rating' },
                count: { $sum: 1 }
                }
            }
        ]);

        await Place.findByIdAndUpdate(feedback.place, {
            avgRating: stats[0]?.avgRating || 0,
            ratingsCount: stats[0]?.count || 0
        });
        
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};