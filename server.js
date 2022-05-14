const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const {createUser, getUsers, getUsersById, removeUserById } = require('./controllers/user.controller');
const {
    getAllTodos,
    getTodoById,
    getTodosByUserId,
    createTodoForCurrentUser,
    updateTodoById,
    deleteTodoById
} = require('./controllers/todo.controller');

const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// create user

app.post('/users', createUser);

// get all users

app.get('/users', getUsers);

// get user by Id

app.get('/users/:userId', getUsersById);

// create todo for current user

app.post('/users/:userId/todos', createTodoForCurrentUser)

// get todos for currentUser

app.get('/users/:userId/todos', getTodosByUserId);

// remove user by Id

app.delete('/users/:userId', removeUserById);

// get all todo

app.get('/todos', getAllTodos)


// get a todo

app.get('/todos/:id', getTodoById)

// update a todo

app.put('/todos/:id', updateTodoById)

// delete a todo

app.delete('/todos/:id', deleteTodoById)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
