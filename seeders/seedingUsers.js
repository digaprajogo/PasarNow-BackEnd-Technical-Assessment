const dataUsers = require("../data/users.json");
const { hashPassword } = require("../helpers/bcrypt");
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "pasarnow";

async function seedUsers() {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const option = { ordered: true };
    dataUsers.forEach((user) => {
      user.password = hashPassword(user.password);
    });
    await usersCollection.insertMany(dataUsers, option);
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log("Successfully seed Users to server");
  } catch (error) {
    console.log("error: ", error);
    throw error;
  } finally {
    await client.close();
  }
}

seedUsers().catch(console.error);
