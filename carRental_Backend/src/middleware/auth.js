const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify Bearer token format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Invalid token format. Use Bearer token.' 
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. Token is missing.' 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role || 'user'
      };
      next();
    } catch (error) {
      return res.status(401).json({ 
        message: 'Invalid token.',
        error: error.message 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Authentication error',
      error: error.message 
    });
  }
};

module.exports = auth;