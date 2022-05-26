const express = require('express');
const {
  getUsers,
  getUsersById,
  removeUserById
} = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/authorization');

const router = express.Router()

// each route verifies over the middleware
router.get('/', authenticateToken, getUsers);
router.get('/:userId', authenticateToken, getUsersById)
router.delete('/:userId', authenticateToken, removeUserById)

module.exports = router
