const Place = require('../models/place.model');
const Feedback = require('../models/feedback.model');


exports.createPlaceService = async (data, userId) => {
    const { name, description, category, lat, lng } = data;

    const place = await Place.create({
        name,
        description,
        category,
        location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        createdBy: userId
    });
    
    return place;
};