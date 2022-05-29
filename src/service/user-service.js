const pool = require('../db');

const getAllUsers = () => pool.query('SELECT * FROM users');

const getOneUserById = (userId) => pool.query('SELECT * FROM users WHERE id = $1', [userId]);

const removeOneUserById = (userId) => pool.query('DELETE FROM users WHERE id = $1', [userId]);



const userService = {
  getAllUsers,
  getOneUserById,
  removeOneUserById,
}

module.exports = userService;