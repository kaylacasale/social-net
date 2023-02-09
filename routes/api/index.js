const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//* defining api URL routes for each model
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;