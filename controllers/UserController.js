const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const UserModel = require("../models/UserModel");

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserModel.getUsers();
      console.log("users: ", users);
      res.status(200).json({ message: "Fetched users data success!", data: users });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!email) throw { name: "required_email", message: "Email or Password required." };
      if (!password) throw { name: "required_password", message: "Email or Password required." };
      const postUser = await UserModel.postUser({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      console.log("postUser: ", postUser);
      res.status(201).json({ message: `Register Successful! with ObjectId(${postUser})` });
    } catch (error) {
      if (error.name === "required_email") res.status(400).json({ message: error.message });
      else if (error.name === "required_password") res.status(400).json({ message: error.message });
      else if (error.code === 11000) res.status(400).json({ message: "Email already exists" });
      else if (error.code === 121) res.status(400).json({ message: "Validation Error" });
      else res.status(500).json({ message: "Internal Server Error", error });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmail(email);
      if (!user) throw { name: "not_found", message: "Email or Password invalid." };

      const comparedPassword = comparePassword(password, user.password);
      if (!comparedPassword) throw { name: "not_found", message: "Email or Password invalid." };

      const payload = { id: user.id, email: user.email, role: user.role };
      const access_token = generateToken(payload);

      res.status(200).json({ message: "Login Successful!", access_token });
    } catch (error) {
      console.log("error: ", error);
      if (error.name === "not_found") {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = UserController;
