const router = require('express').Router();
const { User, Article } = require('../../models');
const { withAuth } = require('../../utils/helpers');

/* '/api/articles endpoint */

// GET an article
router.get('/:id', withAuth, async (req, res) => {
    try {
      // Query Database for :id of the Article and associated Comments
      const articleData = await Article.findOne({
          where: {
              id: req.params.id
          }
        // include: {
        //   // model: Comment, through: xxx
        // },
      });
      // Searialize the returned data
      const searializedArticleData = articleData.map(articleData =>
        articleData.get({ plain: true }));
      // Render the page passing in the serialized data
      res.status(200).render('homepage', {
        searializedArticleData,
        loggedIn: req.session.loggedIn
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

// CREATE new article

// DELETE an article

module.exports = router;