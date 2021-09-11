const router = require('express').Router();
const { User, Article } = require('../../models');

/* '/api/users endpoint */

// Login Page
router.get('/', async (req, res) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    res.status(500).json(error);
  }
});

// DEV: GET all users
router.get('/dev', async (req, res) => {
  try {
    const data = await User.findAll({
      // include: [{ model: Article }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
      // Check the database against the entered email address
      const userData = await User.findOne({
        where: {
          email: req.body.email
        },
      });
      
      // Reject the login attempt if no matching email is found
      if (!userData) {
        res
          .status(400)
          .json({ message: `Incorrect email or password. Please try again!` });
        return;
      }
  
      // Validate the user input password to the password in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      // Reject the login attempt if the passwords do not match
      if (!validPassword) {
        res
          .status(400)
          .json({ message: `Incorrect email or password. Please try again!` });
        return;
      }
  
      // When the email and password validate successfully with the database set
      // the user as logged in and render the homepage
      req.session.save(() => {
        req.session.loggedIn = true,
        req.session.user = userData.username;
        res.json(userData);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    // Create a new user from the input data
    const newUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // When the user is added successfully to the database set
    // the user as logged in and render the homepage
    req.session.save(() => {
      req.session.loggedIn = true,
      req.session.user = newUserData.username;
      res.json(newUserData);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;