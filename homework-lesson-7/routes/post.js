const express = require("express");
const router = express.Router();

const postsController = require("../controllers/PostsController");
const auth = require("../middlewares/auth");

router.use(auth);

router.post("/", postsController.create);
router.get("/", postsController.get);
router.put("/:id", postsController.update);
router.get("/:id", postsController.getId);
router.post("/like/:id", postsController.like);
router.delete("/:id", postsController.destroy);
router.patch("/:id/restore", postsController.restore);
router.delete("/:id/force", postsController.forceDelete);

module.exports = router;
