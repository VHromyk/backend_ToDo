const express = require('express');
const {
    getAllTodos,
    getTodoById,
    getTodosByUserId,
    createTodoForCurrentUser,
    updateTodoById,
    deleteTodoById,
} = require('../controllers/todo.controller');

const router = express.Router();

// each route verifies over the middleware
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.get('/:userId/todos', getTodosByUserId);
router.post('/:userId/todos', createTodoForCurrentUser);
router.put('/:id', updateTodoById);
router.delete('/:id', deleteTodoById);


module.exports = router;
