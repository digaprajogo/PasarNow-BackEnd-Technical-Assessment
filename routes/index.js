const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRouter");
const FoodRouter = require("./FoodRouter");

router.use("/users", UserRouter);

router.use("/food", FoodRouter);

module.exports = router;
