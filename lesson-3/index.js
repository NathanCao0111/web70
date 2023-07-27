const express = require("express");
const app = express();
const crypto = require("crypto");
const posts = require("./utils/mockData");

const students = [
  {
    name: "Alice",
    age: 18,
    private: true,
  },
  {
    name: "Bob",
    age: 19,
    private: false,
  },
  {
    name: "Chris",
    age: 20,
    private: false,
  },
];

const teachers = [
  {
    name: "Yui",
    age: 18,
    private: true,
  },
  {
    name: "Minami",
    age: 19,
    private: false,
  },
  {
    name: "Sunzu",
    age: 20,
    private: true,
  },
];

const logMdw = (req, res, next) => {
  console.log("New req at: ", new Date());
  next();
};

const requireApiKey = (req, res, next) => {
  if (req.query.api_key) {
    req.hasApiKey = true;
  }
  next();
};

app.get("/students", requireApiKey, logMdw, (req, res, next) => {
  if (req.hasApiKey) {
    res.json(students);
  } else {
    res.json(students.filter((student) => !student.private));
  }
});

app.get("/teachers", requireApiKey, logMdw, (req, res, next) => {
  if (req.hasApiKey) {
    res.json(teachers);
  } else {
    res.json(teachers.filter((teacher) => !teacher.private));
  }
});

// app.get(
//   "/students",
//   (req, res, next) => {
//     console.log("students req");
//     next();
//   },
//   (req, res, next) => {
//     res.json(students);
//   }
// );

// app.get('/teachers', (req, res, next) => {
// 	console.log('Log teachers 1')
// 	next()
// }, (req, res, next) => {
// 	console.log('Log teachers 2')
// 	next()
// })

// app.get('/teachers', (req, res) => {
// 	res.json(teachers)
// })

// Lecture
app.get("/api/v1/posts/:id", (req, res) => {
  // step 1: get post id
  const postId = req.params.id;

  // step 2: find existing post
  const existingPost = posts.find((element) => element.id === postId);

  // step 3: validation
  if (!existingPost) {
    return res.json({
      message: "Post is not existed",
    });
  }

  // step 4: response client
  return res.json({
    data: existingPost,
  });
});

app.post("/api/v1/posts", (req, res) => {
  const body = req.body;
  const newPost = {
    id: crypto.randomUUID(),
    ...body,
  };
  posts.push(newPost);
  res.json({
    data: posts,
  });
});

// Lab
app.put('/api/v1/posts/:id', (req, res) => {})

app.delete('/api/v1/posts/:id', (req, res) => {})

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(4000, () => console.log("App listening at http://localhost:4000"));
