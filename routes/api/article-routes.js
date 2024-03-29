const router = require('express').Router();
const { User, Article, Comment } = require('../../models');
const { withAuth } = require('../../utils/helpers');

/* '/api/articles endpoint */

// Dashboard Homepage
router.get('/', withAuth, async (req, res) => {
    try {
        // Query Database for all Articles and associated Comments
        const articleData = await Article.findAll({
            where: { author: req.session.user },
            include: [{ model: Comment }],
            order: [['date_created', 'ASC']]
        });
        // Searialize the returned data
        const searializedArticleData = articleData.map(articleData =>
        articleData.get({ plain: true }));
        // Render the dashboard with the logged in users articles
        res.status(200).render('dashboard', {
            searializedArticleData,
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
});

// DELETE an article
router.delete('/:id', async (req, res) => {
    try {
      const articleData = await Article.destroy({
        where: {
            id: req.params.id
        }
    });
        res.status(204).json(articleData);
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;