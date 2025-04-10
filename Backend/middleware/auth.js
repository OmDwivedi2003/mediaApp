const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  console.log("Auth Middleware is called !")
  try {
    //const token = req.cookies.token;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized, token missing' });
    }
    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token', error });
  }
};

module.exports = auth;
