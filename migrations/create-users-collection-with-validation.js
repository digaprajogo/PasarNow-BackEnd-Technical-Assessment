const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "pasarnow";

async function addValidator() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const validator = {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password"],
        properties: {
          username: {
            bsonType: "string",
            minLength: 6,
            maxLength: 20,
            description: "username length must between 6 and 20 characters",
          },
          email: {
            bsonType: "string",
            pattern: ".com$",
            minLength: 6,
            description:
              "email length minimum is 6 characters and must be a valid email address format",
          },
          password: {
            bsonType: "string",
            minLength: 6,
            description: "password length minimum is 6 characters",
          },
        },
      },
    };
    const setupValidation = await db.createCollection("users", { validator });
    console.log("setupValidation: ", setupValidation);
    // ?? for updating validation on existing collection
    // const updateValidation = await db.command({
    //   collMod: "users",
    //   validationAction: "error",
    //   validator,
    // });
    // console.log("updateValidation: ", updateValidation);
    // ====================================================
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

addValidator().catch(console.error);
