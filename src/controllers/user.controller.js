const pool = require('../db');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM users');

        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const getUsersById = async (req, res) => {
    try {
        const { userId } = req.params;

        const todo = await pool.query('SELECT * FROM users WHERE id = $1', [
            userId,
        ]);

        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const removeUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const allTodos = await pool.query('DELETE FROM users WHERE id = $1', [
            userId,
        ]);

        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { getUsers, getUsersById, removeUserById };