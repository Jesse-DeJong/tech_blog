const router = require('express').Router();

// Import Routes
const usersRoutes = require('./users-routes');
const articleRoutes = require('./article-routes');
const commentRoutes = require('./comment-routes');

// Establish Routers
router.use('/users', usersRoutes);
router.use('/articles', articleRoutes);
router.use('/comments', commentRoutes);

module.exports = router;