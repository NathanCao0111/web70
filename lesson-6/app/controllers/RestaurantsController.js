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
}

module.exports = new RestaurantsController();
