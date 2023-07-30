const express = require("express");
const router = express.Router();
const logApi = require("../middlewares/logApi");
const apiKey = require("../middlewares/apiKey");

router.use(apiKey);
router.use(logApi);

router.get("/", (req, res) => {
  res.send("Home");
});

module.exports = router;
