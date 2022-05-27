const express = require('express');

const { loginUser, signUpUser, logoutUser, refreshToken } = require('../controllers/auth.controllers');
const tokenService = require('../service/token-service');

const router = express.Router();
const { body } = require('express-validator');


router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 32 }),
  signUpUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/refresh', refreshToken);


module.exports = router;