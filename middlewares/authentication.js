const { verifyToken } = require("../helpers/jwt");
const UserModel = require("../models/UserModel");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    const payload = verifyToken(access_token);

    const user = await UserModel.getUserByEmail(payload.email);
    if (!user) throw { name: "inv_token", message: "Unauthorized" };
    req.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log("error: ", error);
    if (error.name === "TokenExpiredError") res.status(401).json({ message: error.message });
    else if (error.name === "JsonWebTokenError") res.status(401).json({ message: error.message });
    else res.status(500).json({ message: "Internal Server Error" });
  }
}

async function adminAuthorization(req, res, next) {
  try {
    const { id, email, username, role } = req.user;
    const user = await UserModel.getUserByEmail(email);
    if (!user) throw { name: "inv_token", message: "Unauthorized" };
    if (user.role !== "admin") throw { name: "inv_role", message: "Forbidden" };
    next();
  } catch (error) {
    if (error.name === "inv_token") res.status(401).json({ message: error.message });
    else res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  authentication,
  adminAuthorization,
};
