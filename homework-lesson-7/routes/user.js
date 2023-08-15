const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UsersController");

router.post("/auth/register", usersController.register);
router.post("/auth/login", usersController.login);

module.exports = router;
