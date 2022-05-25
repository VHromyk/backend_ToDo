const express = require('express');

const { loginUser } = require('../controllers/auth.controllers');
const { jwtTokens } = require('../utils/jwt-helpers');

const router = express.Router();


router.post('/login', loginUser)

router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.status(401).json({ error: 'Null refresh token' })
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
      res.json(tokens);
    })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

router.delete('refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({message: 'refresh token deleted'})

  } catch (error) {
    res.status(401).json({error: error.message})
  }
})

module.exports = router;