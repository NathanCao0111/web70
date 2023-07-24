const express = require("express");
const app = express();
const port = 8000;

// Bai 1
const todoList = [
  {
    id: "74d2e282-3229-44de-bb90-9f4d15354f04",
    todoName: "Làm gì đó 1",
    date: "24/07/2023",
    status: "PENDING",
  },
  {
    id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    todoName: "Làm gì đó 2",
    date: "23/07/2023",
    status: "TODO",
  },
  {
    id: "36128291-709e-466f-8567-966deae2f1b2",
    todoName: "Làm gì đó 3",
    date: "22/07/2023",
    status: "DOING",
  },
  {
    id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
    todoName: "Làm gì đó 4",
    date: "21/07/2023",
    status: "DONE",
  },
];

app.get("/api/todo-list", (req, res) => {
  try {
    const queryParams = req.query;
    const getTodoByFields = todoList.map((element) => {
      if (Object.keys(queryParams).length !== 0) {
        let mappingTodo = {};
        for (let key in element) {
          if (Number(queryParams[key]) === 1) {
            mappingTodo[key] = element[key];
          } else if (Number(queryParams[key]) === 0) {
            const getNewElement = {
              ...element,
            };
            for (let keyOfQuery in queryParams) {
              delete getNewElement[keyOfQuery];
            }
            mappingTodo = {
              ...getNewElement,
            };
          }
        }
        return mappingTodo;
      } else {
        return element;
      }
    });
    res.send({
      data: getTodoByFields,
      message: "Thành công",
      success: true,
    });
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});


// Bai 2
const users = [
  {
    id: "74d2e282-3229-44de-bb90-9f4d15354f04",
    username: "vanA",
    fullname: "Nguyen Van A",
    age: 19,
  },
  {
    id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    username: "nguyenvanB",
    fullname: "Nguyen Van B",
    age: 20,
  },
  {
    id: "36128291-709e-466f-8567-966deae2f1b2",
    username: "NVanC",
    fullname: "Nguyen Van C",
    age: 21,
  },
  {
    id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
    username: "VAND",
    fullname: "Nguyen Van D",
    age: 22,
  },
];

app.get("/api/users", (req, res) => {
  res.send({
    data: users,
    message: "Thành công",
    success: true,
  });
});




app.get("/", (req, res) => {
  res.send("Bài tập Lesson 2: Express");
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
