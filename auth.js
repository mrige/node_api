const  jwt  = require("jsonwebtoken");
const dotenv  = require("dotenv");

const auth = (req, res, next) => {
    const token = req.header('auth-token');
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified =  jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send('Authentication Failed');
  }
}

module.exports = auth;