const pool = require('../db');

const signUp = (name, email, hashedPass) => pool.query(
        'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *',
        [name, email, hashedPass]
);
    
const login = (email) => pool.query('SELECT * FROM users WHERE email=$1', [email]);


const authService = {
  signUp,
  login
}

module.exports = authService;