const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  const tokenValid = req.cookies.token;
  if (!token) return res.status(401).send('Access denied. No token provided.');
  if (token != tokenValid) return res.status(401).send('Access denied. Token is not valid');

  try {
    const decoded = jwt.verify(token, process.env.API_KEY);
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}