const pool = require('../db');

const getAllUsers = () => {
  return pool.query('SELECT * FROM users');
};

const getOneUserById = (userId) => {
  return pool.query('SELECT * FROM users WHERE id = $1', [userId]);
}

const removeOneUserById = (userId) => {
  return pool.query('DELETE FROM users WHERE id = $1', [
            userId,
        ])
}


const userService = {
  getAllUsers,
  getOneUserById,
  removeOneUserById,
}

module.exports = userService;