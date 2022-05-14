const pool = require('../db');

const getAllTodos = async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todos');

        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todos WHERE id = $1', [
            id,
        ]);
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const getTodosByUserId = async (req, res) => {
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

const createTodoForCurrentUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { description, completed } = req.body;

        const newTodo = await pool.query(
            'INSERT INTO todos (description, completed, user_id) VALUES($1, $2, $3) RETURNING *',
            [description, completed, userId]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
};

const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, completed } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todos SET description = $1, completed = $2 WHERE id = $3',
            [description, completed, id]
        );

        res.json(`Todo with id ${id} was updated`);
    } catch (error) {
        console.error(error.message);
    }
};

const deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const removeTodo = await pool.query('DELETE FROM todos WHERE id = $1', [
            id,
        ]);

        res.json(`Todo with id ${id} was removed`);
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { getAllTodos, getTodoById, getTodosByUserId, createTodoForCurrentUser, updateTodoById, deleteTodoById };