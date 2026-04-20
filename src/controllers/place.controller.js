// src/controllers/place.controller.js
const Place = require('../models/place.model');
const Feedback = require('../models/feedback.model');

// create place
const placeService = require('../services/place.service');

exports.createPlace = async (req, res) => {
    try {
        const place = await placeService.createPlaceService(
            req.body,
            req.user.id
        );

        res.status(201).json(place);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all Places
exports.getAllPlaces = async (req, res) => {
    try {
        const {
            search,
            category,
            page = 1,
            limit = 10,
            sort = 'newest'
            } = req.query;

        const pageNum = parseInt(page);
        const limitNum = Math.min(parseInt(limit), 50);
        let matchStage = {};

        if (search) {
            matchStage.name = { $regex: search, $options: 'i' };
        }

        if (category) {
            matchStage.category = category;
        }

        // sort type
        let sortStage = { createdAt: -1 }; // default newest

        if (sort === 'rating') {
            sortStage = { avgRating: -1 };
        }

        const places = await Place.aggregate([
            { $match: matchStage },

            // join feedbacks
            {
                $lookup: {
                from: "feedbacks",
                localField: "_id",
                foreignField: "place",
                as: "feedbacks"
                }
            },

            // calculate avg + count
            {
                $addFields: {
                avgRating: { $ifNull: [{ $avg: "$feedbacks.rating" }, 0] },
                ratingsCount: { $size: "$feedbacks" }
                }
            },

            //  sorting 
            { $sort: sortStage },

            // pagination
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum }
        ]);

        //  total count (without pagination)
        const total = await Place.countDocuments(matchStage);

        res.json({
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        results: places
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get place by id
exports.getPlaceById = async (req, res) => {
    try {
        const mongoose = require('mongoose');

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const place = await Place.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: "feedbacks",
                localField: "_id",
                foreignField: "place",
                as: "feedbacks"
            }
        },
        {
            $addFields: {
                avgRating: { $ifNull: [{ $avg: "$feedbacks.rating" }, 0] }
            }
        }
        ]);

        if (!place.length) {
        return res.status(404).json({ message: 'Place not found' });
        }

        res.json(place[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Nearby API
exports.getNearbyPlaces = async (req, res) => {
    try {
    const { lng, lat, distance = 5000 } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({ message: 'lat and lng are required' });
    }

    const places = await Place.find({
        location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: parseInt(distance)
        }
    }
    }).limit(20);

    res.json(places);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};


//  recommendation (top rated)
exports.getTopRatedPlaces = async (req, res) => {
    try {
        const results = await Feedback.aggregate([
        {
            $group: {
                _id: "$place",
                avgRating: { $avg: "$rating" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                avgRating: -1,
                count: -1
                }
        },
        {
            $lookup: {
                from: "places",
                localField: "_id",
                foreignField: "_id",
                as: "place"
            }
        },
        { $unwind: "$place" },
        {
        $project: {
            _id: 0,
            place: 1,
            avgRating: 1,
            count: 1
            }
        },
        { $limit: 10 }
        ]);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};