const express = require("express");
const router = express.Router();
const restaurantsController = require("../controllers/restaurantsController");

router.post("/restaurants", restaurantsController.create);

module.exports = router;
