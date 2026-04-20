// src/routes/place-routes.js
const router = require('express').Router();
const controller = require('../controllers/place.controller');
const auth = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');


router.post('/', auth, controller.createPlace);


router.get('/', controller.getAllPlaces);
router.get('/nearby', controller.getNearbyPlaces);
router.get('/top-rated', controller.getTopRatedPlaces);

router.get('/:id',validateObjectId, controller.getPlaceById);
// router.put('/:id', auth, validateObjectId, controller.updatePlace);
// router.delete('/:id', auth, validateObjectId, controller.deletePlace);

module.exports = router;