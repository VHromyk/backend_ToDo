const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// create a todo

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)",
            [description]);
        
        res.json(newTodo)
        
    } catch (error) {
        console.error(error.message)
    }
})

// get all todo

// get a todo

// update a todo

// delete a todo



app.use('/', (req, res) => {
    res.send('Hello everyone!!!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
