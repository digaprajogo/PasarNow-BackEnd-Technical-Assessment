const dataFood = require("../data/food.json");
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "pasarnow";

async function seedFood() {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const user = await db.collection("users").findOne({ email: "admin1@admin.com" });
    dataFood.forEach((food) => {
      food.userId = user._id;
    });
    const foodCollection = db.collection("food");
    const option = { ordered: true };
    await foodCollection.insertMany(dataFood, option);
    await db.collection("food").createIndex({ name: 1 }, { unique: true });
    console.log("Successfully seed Food to server");
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

seedFood().catch(console.error);
