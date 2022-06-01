const express = require('express');
const {
  getUsers,
  getUsersById,
  removeUserById,
  getCurrentUser
} = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/authorization');

const router = express.Router()

// each route verifies over the middleware
router.get('/', authenticateToken, getUsers);
router.get('/current', authenticateToken, getCurrentUser);
router.get('/:userId', getUsersById)
router.delete('/:userId', removeUserById)

module.exports = router
