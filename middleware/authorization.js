const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  // We are getting the token from headers
  const authHeader = req.headers['authorization']; // Bearer TOKEN

  const token = authHeader && authHeader.split(' ')[1];
  
  if (token === null) return res.status(401).json({ error: "Null token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  })
}

module.exports = { authenticateToken }