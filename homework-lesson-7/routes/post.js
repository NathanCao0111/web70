const express = require("express");
const router = express.Router();

const postsController = require("../controllers/PostsController");
const auth = require("../middlewares/auth");

router.post("/", auth, postsController.create);
router.get("/", auth, postsController.get);
router.put("/:id", auth, postsController.update);
router.get("/:id", auth, postsController.getId);
router.post("/like/:id", auth, postsController.like);
router.delete("/:id", auth, postsController.destroy);
router.patch("/:id/restore", auth, postsController.restore);
router.delete("/:id/force", auth, postsController.forceDelete);

module.exports = router;
