const express = require("express");
const app = express();

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
  }
  else {
    res.json(students.filter(student => !student.private))
  }
});

app.get("/teachers", requireApiKey, logMdw, (req, res, next) => {
  if (req.hasApiKey) {
    res.json(teachers);
  }
  else {
    res.json(teachers.filter(teacher => !teacher.private))
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

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(4000, () => console.log("App listening at http://localhost:4000"));
