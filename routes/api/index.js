const router = require('express').Router();

// Import Routes
const usersRoutes = require('./users-routes');
const articleRoutes = require('./article-routes');

// Establish Routers
router.use('/users', usersRoutes);
router.use('/articles', articleRoutes);

module.exports = router;