const express = require("express");
const app = express();
const port = 8000;
const crypto = require("crypto");
const { users, posts } = require("./data");
const logApi = require("./middlewares/logApi");
const checkUser = require("./middlewares/checkUser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bai 1
app.get("/api/users", logApi, (req, res) => {
  try {
    res.status(200).send({
      data: users,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      status: "Failed",
      success: false,
    });
  }
});

// bai 2
app.get("/api/posts/user/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const query = req.query;
    let renderedPost = [];
    const filteredPostById = posts.filter(
      (element) => element.userId === userId
    );
    renderedPost = [...filteredPostById];
    if (renderedPost.length === 0) {
      throw new Error("Cannot find any post");
    } else {
      const postByQuery = renderedPost.filter((element) => {
        if (Object.keys(query).length !== 0) {
          if (query.title && query.content) {
            return (
              element.title.toLowerCase().includes(query.title) &&
              element.body.content.toLowerCase().includes(query.content)
            );
          } else {
            return (
              element.title.toLowerCase().includes(query.title) ||
              element.body.content.toLowerCase().includes(query.content)
            );
          }
        } else {
          return element;
        }
      });
      renderedPost = [...postByQuery];
    }
    renderedPost.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    res.status(200).send({
      data: renderedPost,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      data: [],
      status: error.message,
      success: false,
    });
  }
});

// bai 3
app.get("/api/users/posts", (req, res) => {
  try {
    const allPostsByUsers = users.map((user) => {
      const postsByUsers = posts.filter((post) => {
        if (post.userId === user.id) {
          return post;
        }
      });
      return {
        userId: user.id,
        posts: postsByUsers,
        total: postsByUsers.length,
      };
    });
    res.status(200).send(allPostsByUsers);
  } catch (error) {
    res.status(404).send({
      data: [],
      status: error.message,
      success: false,
    });
  }
});

// bai 4
app.post("/api/posts", (req, res) => {
  try {
    const userId = req.query.userId;
    const body = req.body;
    const findUser = users.find((user) => user.id === userId);
    if (findUser) {
      posts.push({
        ...body,
        id: crypto.randomUUID(),
        userId: findUser.id,
      });
    } else {
      throw new Error("Người dùng không tồn tại");
    }
    res.status(200).send({
      data: posts,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      status: error.message,
      success: false,
    });
  }
});

// bai 5
app.put("/api/posts/:id", (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.query.userId;
    const body = req.body;
    const findUser = users.find((user) => user.id === userId);
    if (findUser) {
      const findPost = posts.find((post) => post.id === postId);
      if (findPost) {
        for (const key in body) {
          if (findPost[key] && key !== "id" && key !== "userId") {
            findPost[key] = body[key];
          }
        }
      } else {
        throw new Error("Bài viết không tồn tại");
      }
    } else {
      throw new Error("Người dùng không tồn tại");
    }
    res.status(200).send({
      data: posts,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      status: error.message,
      success: false,
    });
  }
});

// bai 6
app.delete("/api/posts/:id", (req, res) => {
  try {
    const postId = req.params.id;
    const findPost = posts.findIndex((post) => post.id === postId);
    if (findPost !== -1) {
      posts.splice(findPost, 1);
    } else {
      throw new Error("Bài viết không tồn tại");
    }
    res.status(200).send({
      data: posts,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      status: error.message,
      success: false,
    });
  }
});

// bai 7
app.delete("/api/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    let renderedPosts = [];
    const findUser = users.findIndex((user) => user.id === id);
    if (findUser !== -1) {
      users.splice(findUser, 1);
      const filteredPosts = posts.filter((post) => {
        return post.userId !== id;
      });
      renderedPosts = [...filteredPosts];
    } else {
      throw new Error("Người dùng không tồn tại");
    }
    res.status(200).send({
      users: users,
      posts: renderedPosts,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.get("/", (req, res) => {
  try {
    res.status(200).send("Bài tập Lesson 3");
  } catch (error) {
    res.status(404).send({
      data: null,
      status: "Failed",
      success: false,
    });
  }
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
