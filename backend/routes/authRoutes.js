const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/isAuth.js');
const authController = require('../controllers/authControllers.js');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logoutUser);
router.get('/user', isAuth, authController.getUserProfile);

module.exports = router;