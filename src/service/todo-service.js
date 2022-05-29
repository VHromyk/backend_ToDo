const pool = require('../db');

const findAllTodos = () => pool.query('SELECT * FROM todos');

const findTodoById = (id) => pool.query('SELECT * FROM todos WHERE id = $1', [id]);

const findTodosByUserId = (userId) => pool.query('SELECT * FROM users WHERE id = $1', [userId]);

const createTodoByUserId = ({ description, completed, userId }) => pool.query(
        'INSERT INTO todos (description, completed, user_id) VALUES($1, $2, $3) RETURNING *',
        [description, completed, userId]
    );

const updateTodoById = ({ description, completed, id }) => pool.query(
        'UPDATE todos SET description = $1, completed = $2 WHERE id = $3',
        [description, completed, id]
    );

const findTodoAndRemove = (id) => pool.query('DELETE FROM todos WHERE id = $1', [id]);

const todoService = {
  findAllTodos,
  findTodoById,
  findTodosByUserId,
  createTodoByUserId,
  updateTodoById,
  findTodoAndRemove,
}

module.exports = todoService;