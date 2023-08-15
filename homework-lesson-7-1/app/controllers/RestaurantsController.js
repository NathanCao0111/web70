const Restaurant = require("../model/restaurant");
const resClientData = require("../../utils/resCLientData");

class RestaurantsController {
  // [GET] /
  async all(req, res) {
    try {
      const allRestaurants = await Restaurant.find();
      resClientData(res, 200, allRestaurants);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [GET] /find/
  async find(req, res) {
    try {
      const { zipcode, borough, cuisine, street } = req.query;
      const query = {};

      if (zipcode) {
        query["address.zipcode"] = zipcode;
      }

      if (borough) {
        query.borough = borough;
      }

      if (cuisine) {
        query.cuisine = cuisine;
      }

      if (street) {
        query["address.street"] = street;
      }

      const findRestaurants = await Restaurant.find(query);
      resClientData(res, 200, findRestaurants);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [GET] /ratings/quantity
  async ratingsQuantity(req, res) {
    try {
      const { quantity } = req.query;
      const rateQuantities = await Restaurant.aggregate([
        {
          $set: {
            numberOfGrades: { $size: "$grades" },
          },
        },
        {
          $match: {
            numberOfGrades: { $gt: Number(quantity) },
          },
        },
      ]);
      resClientData(res, 200, rateQuantities);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [GET] /ratings/rate
  async ratingsRate(req, res) {
    try {
      const { rate } = req.query;
      const rateData = rate.toUpperCase();
      const rateOfRatings = await Restaurant.aggregate([
        {
          $unwind: "$grades",
        },
        {
          $match: { "grades.grade": rateData },
        },
      ]);
      resClientData(res, 200, rateOfRatings);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [GET] /ratings/score
  async ratingsScore(req, res) {
    try {
      const { score } = req.query;
      const minScore = await Restaurant.aggregate([
        {
          $unwind: "$grades",
        },
        {
          $group: {
            _id: { _id: "$_id", name: "$name" },
            totalScore: { $sum: "$grades.score" },
          },
        },
        {
          $match: { totalScore: { $gt: Number(score) } },
        },
      ]);
      resClientData(res, 200, minScore);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }
}

module.exports = new RestaurantsController();
