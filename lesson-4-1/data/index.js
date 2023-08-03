const crypto = require("crypto");

const users = [
  {
    id: crypto.randomUUID(),
    username: "Nathan Cao",
    age: 18,
    email: "nathancao0111@gmail.com",
    location: "hanoi",
    password: "123456",
  },
];

module.exports = users;
