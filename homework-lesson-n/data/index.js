const crypto = require("crypto");

const users = [
  { username: "alice", apiKey: "alice@123" },
  { username: "bob", apiKey: "bob@123" },
  { username: "charlie", apiKey: "charlie@123" },
];

const students = [
  {
    id: crypto.randomUUID(),
    name: "Ernestine Milani",
    gender: "Female",
    age: 18,
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Gordy Davey",
    gender: "Male",
    age: 19,
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Raynard Reynold",
    gender: "Male",
    age: 20,
    date: new Date(),
  },
];

const teachers = [
  {
    id: crypto.randomUUID(),
    name: "Dominick Eliana",
    gender: "Male",
    age: 28,
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Kristen Vivyan",
    gender: "Female",
    age: 29,
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Zachary Rachel",
    gender: "Male",
    age: 30,
    date: new Date(),
  },
];

const subjects = [
  {
    id: crypto.randomUUID(),
    name: "HTML CSS",
    description:
      "From basic to advanced, practice 8 projects, hundreds of exercises, private Q&A site, certificate after course and buy once for life.",
    price: 12,
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Basic Javascript Programming",
    description:
      "Learning basic Javascript is suitable for people who have never learned programming. With over 100 lessons and practice exercises after each lesson.",
    price: 16,
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "NodeJS & ExpressJS",
    description:
      "Learn Back-end with Node & ExpressJS framework, understand Back-end concepts and build RESTful API for website.",
    price: 24,
    date: new Date(),
  },
];

module.exports = { users, students, teachers, subjects };
