const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');
const placeRoutes = require('./routes/place.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const errorHandler = require('./middlewares/error.middleware');

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(helmet());



//routes
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/feedback', feedbackRoutes);


// test route
app.get('/', (req, res) => {
    res.send('API is working 🚀');
});
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You are authorized', user: req.user });
});
module.exports = app;