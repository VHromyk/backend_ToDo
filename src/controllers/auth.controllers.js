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

        if (user.rows.length === 0) {
            // PASSWORD CHECK
            res.status(400).json({ error: 'Email is incorrect' });
        } else {
             const isPassEquals = await bcrypt.compare(
                 password,
                 user.rows[0].password
             );
             if (!isPassEquals)
                 return res
                     .status(401)
                     .json({ error: 'Password is incorrect' });
             // JWT
             let tokens = tokenService.generateTokens(user.rows[0]);
             res.cookie('refreshToken', tokens.refreshToken, {
                 httpOnly: true,
             });

             res.json(tokens);
      }
     
     
      
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        res.clearCookie(refreshToken);

        return res.status(200).json({message: `Refresh token was deleted`});

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            return res.status(401).json({ error: 'Null refresh token' });
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error, user) => {
                if (error)
                    return res.status(403).json({ error: error.message });
                let tokens = tokenService.generateTokens(user);
                // We safe refresh-token into the coockie
                // Http only because we are not allowet to change cookies by JS
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                });
                res.json(tokens);
            }
        );
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = { loginUser, signUpUser, logoutUser, refreshToken };
