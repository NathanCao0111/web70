const express = require("express");
const router = express.Router();

const apiController = require("../controllers/ApiController");
const auth = require("../middlewares/auth");
const verifyRegister = require("../middlewares/verifyRegister");
const verifyApiKey = require("../middlewares/verifyApiKey");

router.post("/auth/login", auth, apiController.login);

router.post("/auth/register", verifyRegister, apiController.register);

router.get("/posts/:id", verifyApiKey, apiController.posts);

module.exports = router;
