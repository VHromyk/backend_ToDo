const todoService = require('../service/todo-service');

const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.findAllTodos();

        res.json(todos.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const getTodoById = async (req, res) => {
    try {
        const todo = await todoService.findTodoById(req.params.id);

        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const getTodosByUserId = async (req, res) => {
    try {
        const todo = await todoService.findTodosByUserId(req.params.userId);

        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const createTodoForCurrentUser = async (req, res) => {
    try {
        const credentionals = {
            userId: req.params.userId,
            description: req.body.description,
            completed: req.body.completed
        }

        const newTodo = await todoService.createTodoByUserId(credentionals);

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
};

const updateTodoById = async (req, res) => {
    try {
        const credentionals = {
              id: req.params.id,
              description: req.body.description,
              completed: req.body.completed,
        };
        
        const updatedTodo = await todoService.updateTodoById(credentionals);

        res.json(`Todo with id ${credentionals.id} was updated`);
    } catch (error) {
        console.error(error.message);
    }
};

const deleteTodoById = async (req, res) => {
    try {
        const removeTodo = await todoService.findTodoAndRemove(req.params.id);

        res.json(`Todo with id ${removeTodo.rows[0].id} was removed`);
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { getAllTodos, getTodoById, getTodosByUserId, createTodoForCurrentUser, updateTodoById, deleteTodoById };