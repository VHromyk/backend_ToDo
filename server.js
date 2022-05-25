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
const todoRouter = require('./routes/todo.router');

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
app.use('/users', userRouter);

app.use('/todos', todoRouter);
app.use('/users', todoRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
