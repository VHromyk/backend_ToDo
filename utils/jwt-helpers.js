const jwt = require('jsonwebtoken');


function jwtTokens({ id, name, email }) {
  const user = { id, name, email }

  // created access token and refresh token
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '5m',
  });
  return (
    { accessToken, refreshToken }
  )
}

module.exports = { jwtTokens };