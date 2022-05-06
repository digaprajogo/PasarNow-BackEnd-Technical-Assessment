const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class FoodModel {
  static async getAllFood() {
    try {
      const db = getDatabase();
      const food = await db.collection("food").find().toArray();
      return food;
    } catch (error) {
      throw error;
    }
  }

  static async getFoodById(mongoId) {
    try {
      const db = getDatabase();
      const foodById = await db.collection("food").findOne({ _id: ObjectId(mongoId) });
      return foodById;
    } catch (error) {
      throw error;
    }
  }

  static async getFoodByCategory(category) {
    try {
      const db = getDatabase();
      const pipeline = [
        { $match: { category } },
        { $project: { _id: 0, name: 1, price: 1, imgUrl: 1, category: 1 } },
      ];
      const foodByCategory = await db.collection("food").aggregate(pipeline).toArray();
      return foodByCategory;
    } catch (error) {
      throw error;
    }
  }
  static async getFoodByPage(page) {
    try {
      const db = getDatabase();
      const pipeline = [
        {
          $facet: {
            metadata: [{ $skip: (page - 1) * 10 }, { $limit: 10 }, { $count: "total" }],
            food: [
              { $sort: { _id: 1 } },
              { $skip: (page - 1) * 10 },
              { $limit: 10 },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  price: 1,
                  imgUrl: 1,
                  category: 1,
                  description: 1,
                },
              },
            ],
          },
        },
      ];
      const foodByPage = await db.collection("food").aggregate(pipeline).toArray();
      if (!foodByPage[0].metadata[0]?.total) {
        throw { name: "not_found", message: "Food not found" };
      }
      return foodByPage;
    } catch (error) {
      throw error;
    }
  }

  static async getFoodGroupBy(by) {
    try {
      const db = getDatabase();
      const pipeline = [
        {
          $group: {
            _id: `$${by}`,
            totalMenu: { $sum: 1 },
            averagePrice: { $avg: "$price" },
            maxPrice: { $max: "$price" },
            minPrice: { $min: "$price" },
          },
        },
        { $sort: { totalMenu: 1 } },
      ];
      const foodGroupBy = await db.collection("food").aggregate(pipeline).toArray();
      return foodGroupBy;
    } catch (error) {
      throw error;
    }
  }

  static async createFood({ name, description, price, imgUrl, category, id }) {
    try {
      const db = getDatabase();
      const foodCreated = await db
        .collection("food")
        .insertOne({ name, description, price, imgUrl, category, userId: ObjectId(id) });
      return foodCreated.insertedId;
    } catch (error) {
      throw error;
    }
  }

  static async updateFood(id, food) {
    try {
      const db = getDatabase();
      const update = await db.collection("food").updateOne({ _id: ObjectId(id) }, { $set: food });
      return update.modifiedCount;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFoodById(id) {
    try {
      const db = getDatabase();
      const deleteFood = await db.collection("food").deleteOne({ _id: ObjectId(id) });
      return deleteFood.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FoodModel;
