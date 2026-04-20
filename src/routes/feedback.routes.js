const router = require('express').Router();
const controller = require('../controllers/feedback.controller');
const auth = require('../middlewares/auth.middleware');
const validateObjectId = require('../middlewares/validateObjectId');

router.post('/', auth, controller.createFeedback);

router.get('/', controller.getAllFeedbacks);
router.get('/place/:placeId', controller.getPlaceFeedbacks);
router.put('/:id', auth, validateObjectId, controller.updateFeedback);
router.delete('/:id', auth, validateObjectId, controller.deleteFeedback);

module.exports = router;
