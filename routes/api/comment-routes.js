const router = require('express').Router();
const { User, Article, Comment } = require('../../models');
const { withAuth } = require('../../utils/helpers');

/* '/api/comments endpoint */

router.get('/dev', async (req, res) => {
    const comments = await Comment.findAll();
    res.json(comments);
})

// CREATE new comment
router.post('/publish', withAuth, async (req, res) => {
    try {
        // Create a new comment from the input data
        const newCommentData = await Comment.create({
            comment_content: req.body.contents,
            article_title: req.body.articleId,
            author: req.session.user
        });
        res.status(200).json(newCommentData);
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE a comment

module.exports = router;