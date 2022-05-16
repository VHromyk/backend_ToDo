const bcrypt = require('bcrypt');
const pool = require('../db')
const { jwtTokens } = require('../utils/jwt-helpers')


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
      
        const user = await pool.query(
            'SELECT * FROM users WHERE email=$1',
            [email]
      );

      if (user.rows.length === 0) return res.status(400).json({ error: "Email is incorrect" });
      // PASSWORD CHECK
      const validPassword = await bcrypt.compare(password, user.rows[0].password)
      if (!validPassword) return res.status(401).json({ error: "Password is incorrect" })
      // JWT
        let tokens = jwtTokens(user.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
        res.json(tokens);
      
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

module.exports = { loginUser };
