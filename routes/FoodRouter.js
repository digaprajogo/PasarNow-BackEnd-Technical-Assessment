const express = require("express");
const FoodController = require("../controllers/FoodController");
const { adminAuthorization, authentication } = require("../middlewares/authentication");
const router = express.Router();

router.use(authentication);

router.get("/", FoodController.getAllFood);
router.get("/groupBy", FoodController.getFoodGroupBy);
router.get("/category/:category", FoodController.getFoodByCategory);
router.get("/:mongoId", FoodController.getFoodById);

router.use(adminAuthorization);

router.post("/", FoodController.createFood);
router.put("/:mongoId", FoodController.updateFood);
router.delete("/:mongoId", FoodController.deleteFood);

module.exports = router;
