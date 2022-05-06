if (process.env.NODE_ENV !== "production") require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
    return token;
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
  },
};
