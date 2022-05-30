const bcrypt = require('bcrypt');
const authService = require('../service/auth-service');
const tokenService = require('../service/token-service');
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
   
            const user = await authService.signUp(name, email, hashedPassword);

            let token = tokenService.generateTokens(user.rows[0]);
            
            function userDTO({name, email}) {
                return {
                    user: { name, email },
                    token: token.accessToken,
                };
            }
   
           res.status(201).json(userDTO(user.rows[0]));
        //    return res.redirect('http://localhost:3000/login');
        }
     } catch (error) {
         console.error({error: error.message});
     }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.login(email, password);

        if (!user.rows.length) {
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
            
              function userDTO({ name, email }) {
                  return {
                      user: { name, email },
                      token: tokens.accessToken,
                  };
              }

             res.status(200).json(userDTO(user.rows[0]));
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
        
        const tokens = tokenService.refreshToken(refreshToken);

        res.json(tokens)
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = { loginUser, signUpUser, logoutUser, refreshToken };
