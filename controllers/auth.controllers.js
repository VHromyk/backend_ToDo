const bcrypt = require('bcrypt');
const pool = require('../db')
const tokenService = require('../service/token-service')
const { validationResult } = require('express-validator');


const signUpUser = async (req, res) => {
    try {
        // Validation email and password 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({error: 'Email or password are not validated!'})
        } else {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
   
           const newTodo = await pool.query(
               'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *',
               [name, email, hashedPassword]
            );
   
           res.json(newTodo.rows[0]);
           return res.redirect('http://localhost:3000/login');
        }
     } catch (error) {
         console.error({error: error.message});
     }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE email=$1',
            [email]
      );

      if (user.rows.length === 0) return res.status(400).json({ error: "Email is incorrect" });
      // PASSWORD CHECK
      const validPassword = await bcrypt.compare(password, user.rows[0].password)
      if (!validPassword) return res.status(401).json({ error: "Password is incorrect" })
      // JWT
        let tokens = tokenService.generateTokens(user.rows[0]);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true
        })
        res.json({email, tokens});
      
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

module.exports = { loginUser, signUpUser };
