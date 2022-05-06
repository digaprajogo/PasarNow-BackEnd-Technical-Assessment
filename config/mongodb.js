const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "pasarnow";
let db;

async function connect() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.log("error: ", error);
  }
}

function getDatabase() {
  return db;
}

module.exports = { connect, getDatabase };

// connect()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
