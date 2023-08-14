const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $match: { fullname: "Lionel Messi" },
      },
    ]);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
