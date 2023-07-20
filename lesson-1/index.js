// console.log('hello')

// const { sum, sub, multiply } = require('./math')
// const a = 4;
// const b = 5;
// const result = sum(4, 5)

// console.log(`Sum of ${a} + ${b} = ${result}`)

// console.log(sub(4, 5))

const express = require("express");
const app = express();
const port = 3000;
let todoList = []
const crypto = require('crypto')

app.get('', (req, res) => {
  res.send({
    message: 'Create successfully'
  })
})

app.get("/api/v1/todo-list", (req, res) => {
  res.send({
    data: todoList,
    message: 'Success',
    success: true
  });
});

app.get('/api/v1/todo-list/add', (req, res) => {
  const newTodo = {
    id: crypto.randomUUID(),
    name: 'Nathan Cao',
    createdAt: new Date()
  }
  todoList.push(newTodo)
  res.send({
    data: {},
    message: 'Add successfully',
    success: true
  })
})

app.get('/api/v1/todo-list/delete-duplicate', (req, res) => {
  const deleteDuplicate = todoList.find((element, index) => todoList.indexOf(element) === index)
  console.log(deleteDuplicate)
  todoList = [deleteDuplicate]
  res.send({
    data: {},
    message: 'Delete duplicate successfully',
    success: true
  })
})

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

// const user = {
//   name: 'Nathan Cao',
//   age: 18,
//   description: 'Chad'
// }
// for (let i = 0; i < 10; i++) {
//   console.log(i)
// }

// console.log(user)
