const jwt = require('jsonwebtoken');


class TokenService {
  generateAccessToken({ id, name, email }) {
    const user = { id, name, email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
    });
    return accessToken;
  }
  
  generateTokens({ id, name, email }) {
      const user = { id, name, email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30m',
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '30d',
      });
      return {
          accessToken,
          refreshToken,
      };
  };
  refreshToken(tokenForRefresh) {
     jwt.verify(
         tokenForRefresh,
         process.env.REFRESH_TOKEN_SECRET,
         (error, user) => {
             if (error) return res.status(403).json({ error: error.message });
             let tokens = this.generateTokens(user);
             // We safe refresh-token into the coockie
             // Http only because we are not allowet to change cookies by JS
             res.cookie('refreshToken', tokens.refreshToken, {
                 httpOnly: true,
             });
             return tokens;
         }
     );
  }
}

module.exports = new TokenService;