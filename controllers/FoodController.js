const FoodModel = require("../models/FoodModel");

class FoodController {
  static async getAllFood(req, res) {
    try {
      let { page } = req.query;

      if (!Object.keys(req.query).length) {
        const food = await FoodModel.getAllFood();
        return res.status(200).json({ message: "Fetched food data success!", data: food });
      }

      if (!page || page <= 0) page = 1;
      const foodByPage = await FoodModel.getFoodByPage(page);
      res.status(200).json({ message: "Fetched food data by page success!", data: foodByPage });
    } catch (error) {
      console.log("error: ", error);
      if (error.name === "not_found") res.status(404).json({ message: error.message });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getFoodById(req, res) {
    try {
      const { mongoId } = req.params;
      const foodById = await FoodModel.getFoodById(mongoId);
      if (!foodById) throw { name: "not_found", message: "Food not found" };
      res.status(200).json({ message: "Fetched food data by ID success!", data: foodById });
    } catch (error) {
      console.log("error30: ", error);
      if (error.name === "not_found") res.status(404).json({ message: error.message });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getFoodByCategory(req, res) {
    try {
      const { category } = req.params;
      const foodByCategory = await FoodModel.getFoodByCategory(category);
      if (foodByCategory.length === 0) throw { name: "not_found", message: "Food not found" };
      return res
        .status(200)
        .json({ message: "Fetched food data by category success!", data: foodByCategory });
    } catch (error) {
      if (error.name === "not_found") res.status(404).json({ message: error.message });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getFoodGroupBy(req, res) {
    try {
      let { by } = req.query;
      if (!by) by = "category";
      const foodGroupBy = await FoodModel.getFoodGroupBy(by);
      res
        .status(200)
        .json({ message: `Fetched food data group by ${by} success!`, data: foodGroupBy });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createFood(req, res) {
    try {
      const { name, description, price, imgUrl, category } = req.body;
      const { id } = req.user;
      if (!name) throw { name: "inv_food", message: "Food name is required" };
      const food = await FoodModel.createFood({ name, description, price, imgUrl, category, id });
      res.status(201).json({ message: "Created food data success!", insertedId: food });
    } catch (error) {
      console.log("error: ", error);
      if (error.name === "inv_food") res.status(400).json({ message: error.message });
      else if (error.code === 11000) res.status(400).json({ message: "Food already exists" });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateFood(req, res) {
    try {
      const { name, description, price, imgUrl, category } = req.body;
      const { id } = req.user;
      if (!name) throw { name: "inv_food", message: "Food name is required" };
      const food = await FoodModel.getFoodById(req.params.mongoId);
      if (!food) throw { name: "not_found", message: "Food not found" };
      const updateFood = await FoodModel.updateFood(food._id, {
        name,
        description,
        price,
        imgUrl,
        category,
        userId: id,
      });
      console.log("update: ", updateFood);
      res.status(200).json({ message: "Updated food data success!", modifiedCount: updateFood });
    } catch (error) {
      console.log("error: ", error);
      if (error.name === "inv_food") res.status(400).json({ message: error.message });
      else if (error.code === 11000) res.status(400).json({ message: "Food already exists" });
      else if (error.name === "not_found") res.status(404).json({ message: error.message });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteFood(req, res) {
    try {
      const food = await FoodModel.getFoodById(req.params.mongoId);
      console.log("food: ", food);
      if (!food) throw { name: "not_found", message: "Food not found" };
      const deleteFood = await FoodModel.deleteFoodById(food._id);
      res.status(200).json({ message: "Deleted food data success!", deletedCount: deleteFood });
    } catch (error) {
      console.log("error: ", error.name);
      if (error.code === 11000) res.status(400).json({ message: "Food already exists" });
      else if (error.name === "not_found") res.status(404).json({ message: error.message });
      else res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = FoodController;
