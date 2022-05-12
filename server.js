const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO users (name, email) VALUES($1, $2) RETURNING *',
            [name, email]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// create a todo

app.get('/users', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM users');

        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.post('/todos', async (req, res) => {
    try {
        const { description, completed, user_id } = req.body;
        const newTodo = await pool.query("INSERT INTO todos (description, completed, user_id) VALUES($1, $2, $3) RETURNING *",
            [description, completed, user_id]);
        
        res.json(newTodo.rows[0])
        
    } catch (error) {
        console.error(error.message)
    }
})

// get all todo


app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todos");

        res.json(allTodos.rows);
        
    } catch (error) {
        console.error(error.message)
    }
})


// get a todo

app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [id]);

        res.json(todo.rows);

    } catch (error) {
        console.error(error.message)
    }
})

// update a todo

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description, completed } = req.body;
         const updateTodo = await pool.query(
            'UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3',
            [description, completed, id]
        );

        res.json(`Todo with id ${id} was updated`);

    } catch (error) {
        console.error(error.message)
    }
})

// delete a todo

app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const removeTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", [id],
        );

        res.json(`Todo with id ${id} was removed`)
    } catch (error) {
        console.error(error.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
