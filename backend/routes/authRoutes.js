const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
