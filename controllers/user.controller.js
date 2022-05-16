const pool = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTodo = await pool.query(
            'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
};

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

module.exports = { createUser, getUsers, getUsersById, removeUserById };