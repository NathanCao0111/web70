const Post = require("../models/post");
const resClientData = require("../utils/resClientData");

class PostsController {
  // [POST] /
  async create(req, res) {
    try {
      const bodyData = req.body;
      const post = await Post.create({
        userId: req.user.id,
        title: bodyData.title,
        body: {
          content: bodyData.body.content,
          image: bodyData.body.image,
        },
        liked: bodyData.liked,
      });
      resClientData(res, 200, post);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [GET] /
  async get(req, res) {
    try {
      const posts = await Post.find({});
      resClientData(res, 200, posts);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [PUT] /:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ _id: id });
      if (req.user.id !== post.userId) {
        throw new Error("Unauthorized");
      }
      const updatedPost = await Post.updateOne(
        { _id: req.params.id },
        req.body
      );
      resClientData(res, 200, updatedPost);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [GET] /:id
  async getId(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ _id: id });
      resClientData(res, 200, post);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [POST] /like/:id
  async like(req, res) {
    try {
      const { id } = req.params;
      const likedPost = await Post.findById({ _id: id });
      if (!likedPost.liked) {
        likedPost.liked = 1;
      } else {
        likedPost.liked += 1;
      }
      await likedPost.save();
      resClientData(res, 200, likedPost);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [DELETE] /:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const findPost = await Post.findById({ _id: id });
      if (req.user.id !== findPost.userId) {
        throw new Error("Unauthorized");
      }
      const deletePost = await Post.delete({ _id: id });
      resClientData(res, 200, deletePost);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [PATCH] /:id/restore
  async restore(req, res) {
    try {
      const { id } = req.params;
      const findPost = await Post.findOneDeleted({ _id: id });
      if (req.user.id !== findPost.userId) {
        throw new Error("Unauthorized");
      }
      const restorePost = await Post.restore({ _id: id });
      resClientData(res, 200, restorePost);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [DELETE] /:id/force
  async forceDelete(req, res) {
    try {
      const { id } = req.params;
      const findPost = await Post.findOneWithDeleted({ _id: id });
      if (req.user.id !== findPost.userId) {
        throw new Error("Unauthorized");
      }
      const forceDeletePost = await Post.deleteOne({ _id: id });
      resClientData(res, 200, forceDeletePost);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }
}

module.exports = new PostsController();
