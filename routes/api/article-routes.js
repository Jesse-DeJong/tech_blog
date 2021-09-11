const router = require('express').Router();
const { User, Article } = require('../../models');
const { withAuth } = require('../../utils/helpers');

/* '/api/articles endpoint */

// Dashboard Homepage
router.get('/', withAuth, async (req, res) => {
    try {
        res.status(200).render('dashboard', {
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET an article
router.get('/:id', async (req, res) => {
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
      res.json(articleData);
    //   // Searialize the returned data
    //   const searializedArticleData = articleData.map(articleData =>
    //     articleData.get({ plain: true }));
    //   // Render the page passing in the serialized data
    //   res.status(200).render('homepage', {
    //     searializedArticleData,
    //     loggedIn: req.session.loggedIn
    //   });

    } catch (error) {
      res.status(500).json(error);
    }
  });

// CREATE new article
router.post('/publish', withAuth, async (req, res) => {
    try {
        // Create a new article from the input data
        const newArticleData = await Article.create({
            article_title: req.body.title,
            article_content: req.body.content,
            author: req.session.user
        });
        res.status(200).json(newArticleData);
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE an article

module.exports = router;