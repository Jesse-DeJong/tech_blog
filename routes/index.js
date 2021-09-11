const router = require('express').Router();
const apiRoutes = require('./api');

const { User } = require('../models');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {
    res.status(200).render('homepage');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;