// auth.js

function authenticateToken(req, res, next) {
  // Simple token check for demo purposes
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer mysecrettoken') {
    return res.status(403).json({ error: 'Access denied. Invalid or missing token.' });
  }

  next();
}

module.exports = authenticateToken;
