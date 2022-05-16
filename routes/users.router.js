const express = require('express');
const {
  getUsers,
  createUser,
  getUsersById,
  removeUserById
} = require('../controllers/user.controller');

const router = express.Router()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:userId', getUsersById)
router.delete('/:userId', removeUserById)

module.exports = router
