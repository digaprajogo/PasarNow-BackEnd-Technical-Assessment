const { hashPassword } = require("../helpers/bcrypt");
const { getDatabase } = require("../config/mongodb");

class UserModel {
  static async getUsers() {
    try {
      const db = getDatabase();
      const users = await db
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const db = getDatabase();
      const user = await db.collection("users").findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async postUser({ username, email, password, phoneNumber, address }) {
    try {
      const db = getDatabase();
      const postUser = await db
        .collection("users")
        .insertOne({ username, email, password, phoneNumber, address, role: "admin" });
      await db.collection("users").createIndex({ email: 1 }, { unique: true });
      await db
        .collection("users")
        .updateOne({ email }, { $set: { password: hashPassword(password) } });
      return postUser.insertedId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
