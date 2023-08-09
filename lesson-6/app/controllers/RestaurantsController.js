const Restaurant = require("../model/restaurant");

class RestaurantsController {
  // [GET] /
  async all(req, res) {
    try {
      const allRestaurants = await Restaurant.find();
      res.status(200).json(allRestaurants);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // [GET] /find/zipcode/:id
  async findZipcode(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const zipcodeRestaurants = await Restaurant.find({
        "address.zipcode": id,
      });
      res.status(200).send(zipcodeRestaurants);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // [GET] /find/cuisine/:id
  async findCuisine(req, res) {
    try {
      const { id } = req.params;
      const cuisineRestaurants = await Restaurant.find({
        "cuisine": id,
      });
      res.status(200).send(cuisineRestaurants);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = new RestaurantsController();
