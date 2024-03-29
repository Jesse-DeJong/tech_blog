const router = require('express').Router();
const apiRoutes = require('./api');

const { User, Article, Comment } = require('../models');

// Import API routes
router.use('/api', apiRoutes);

// Unauthenticated Home Route
router.get('/', async (req, res) => {
  try {
    // Query Database for all Articles and associated Comments
    const articleData = await Article.findAll({
      include: [{ model: Comment }],
      order: [['date_created', 'ASC']]
    });
    // Searialize the returned data
    const searializedArticleData = articleData.map(articleData =>
      articleData.get({ plain: true }));
    // Render the page passing in the serialized data
      // res.json(searializedArticleData);
    res.status(200).render('homepage', {
      searializedArticleData,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

module.exports = router;