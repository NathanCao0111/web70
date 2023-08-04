const express = require("express");
const router = express.Router();

const apiController = require("../controllers/ApiController");
const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");
const validateToken = require("../middlewares/validateToken");
const reactPost = require("../middlewares/reactPost");
const validateUser = require("../middlewares/validateUser")

router.post("/auth/register", validateRegister, apiController.register);
router.post("/auth/login", validateLogin, apiController.login);
router.post(
  "/posts/reaction/:id",
  validateToken,
  reactPost,
  apiController.postReaction
);
router.put("/posts/:id", validateToken, validateUser, apiController.update);

module.exports = router;
