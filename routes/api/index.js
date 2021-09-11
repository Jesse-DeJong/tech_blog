const router = require('express').Router();

// Import Routes
const usersRoutes = require('./users-routes');

// Establish Routers
router.use('/users', usersRoutes);

module.exports = router;