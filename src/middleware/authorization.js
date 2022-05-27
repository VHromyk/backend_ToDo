const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  try {
      // We are getting the token from headers
    const authHeader = req.headers.authorization; // Bearer TOKEN
    
    if (!authHeader) {
      res.status(401).json({ message: 'The user unauthorizated'})
    }

    const accessToken = authHeader.split(' ')[1];
    
      if (!accessToken) return res.status(401).json({ error: 'Null token' });
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
          if (error) return res.status(403).json({ error: error.message });
        req.user = user;
          next();
      });
  } catch (error) {
    console.error({message: error.message})
  }

}

module.exports = { authenticateToken }