const express = require("express");
const router = express.Router();
const Restaurant = require("../app/model/restaurant");

const restaurantsController = require("../app/controllers/RestaurantsController");

router.get("/", restaurantsController.all);
router.get("/find", restaurantsController.find);
router.get("/ratings/quantity", restaurantsController.ratingsQuantity);
router.get("/ratings/rate", restaurantsController.ratingsRate);
router.get("/ratings/score", restaurantsController.ratingsScore);

router.get("/sort", async (req, res) => {
  try {
    const sortRestaurants = await Restaurant.aggregate([
      { $unwind: { path: "$grades" } },
      {
        $group: {
          _id: { _id: "$_id", name: "$name" },
          totalScore: { $sum: "$grades.score" },
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(sortRestaurants);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/restaurant/create", async (req, res) => {
  try {
    const { address, borough, cuisine, grades, name, restaurant_id } = req.body;
    await Restaurant.create({
      address: address,
      borough: borough,
      cuisine: cuisine,
      grades: grades,
      name: name,
      restaurant_id: restaurant_id,
    });
    res.status(200).send("Inserted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
