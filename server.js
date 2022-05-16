const express = require('express')
const app = express()
const cors = require('cors')
const {
  createUser,
  getUsers,
  getUsersById,
  removeUserById
} = require('./controllers/user.controller')
const {
  getAllTodos,
  getTodoById,
  getTodosByUserId,
  createTodoForCurrentUser,
  updateTodoById,
  deleteTodoById
} = require('./controllers/todo.controller')

const userRouter = require('./routes/users.router')
const authRouter = require('./routes/auth.router');

require('dotenv').config()

const PORT = process.env.PORT || 5000

// middleware

const corsOptions = {
  credentials: true,
  origin: process.env.URL || '*'
}
app.use(cors(corsOptions))
app.use(express.json())

// ROUTES

app.use('/auth', authRouter);

app.use('/users', userRouter)

// create todo for current user

app.post('/users/:userId/todos', createTodoForCurrentUser)

// get todos for currentUser

app.get('/users/:userId/todos', getTodosByUserId)

// get all todo

app.get('/todos', getAllTodos)

// get a todo

app.get('/todos/:id', getTodoById)

// update a todo

app.put('/todos/:id', updateTodoById)

// delete a todo

app.delete('/todos/:id', deleteTodoById)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
