const express = require("express");
const { connect } = require("./config/mongodb");
const app = express();
const port = 3000;
const cors = require("cors");
const routerIndex = require("./routes/index");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "This is mongoDB REST API by DigaPrajogo for Pasarnow recruitment program" });
});

app.use(routerIndex);

connect()
  .then((db) => {
    // console.log("db: ", db);
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("error: ", error);
  });
