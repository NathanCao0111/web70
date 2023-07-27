// const http = require("http");
// const express = require("express");
// const app = express();
// const port = 5000;
// const route = require("./routes");

// config res.body
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// ); //form data
// app.use(express.json()); //js, json data

// route init
// route(app);

// app.listen(port, () =>
//   console.log(`App listening at http://localhost:${port}`)
// );

// create server
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({
// 			data: 'Hello world'
// 		}));
// });

// server.listen(8080, () => console.log(`Server is running at http://localhost:8080`))

// create web application

// const express = require("express");
// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   console.log(req);
//   res.end(`<h2>Hello</h2>
// 		<p>This is ${req.method} method in URL ${req.url} with status code ${req.statusCode}
// 		`);
// });

// app.get("/product/:id", (req, res) => {
//   // console.log(req);
//   res.end(`<h2>Product</h2>
// 		<p>This is ${req.method} method in URL ${req.url} with status code ${req.statusCode}
// 		<p>Param id: ${req.params.id}</p>
// 		`);
// });

// app.post("/auth/signin", (req, res) => {
//   console.log(req.body);
//   res.send("product posted");
// });

// const hello = (req, res, next) => {
//   console.log("hello");
//   next();
// };

// const xinChao = (req, res, next) => {
//   console.log("xin chao");
//   next();
// };

// app.get("/products", hello, xinChao, (req, res) => {
//   console.log("req query: ", req.query);
//   res.send("product query has arrived");
// });

// app.listen(8000, () =>
//   console.log(`Server is running at http://localhost:8000`)
// );

const express = require("express");
const app = express();
const crypto = require("crypto");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// req.params
const todoList = [
  {
    id: crypto.randomUUID(),
    todoName: "Chores",
    date: new Date(),
    status: "Pending",
  },
  {
    id: crypto.randomUUID(),
    todoName: "Do dishes",
    date: new Date(),
    status: "Pending",
  },
  {
    id: crypto.randomUUID(),
    todoName: "Learn backend programming",
    date: new Date(),
    status: "Pending",
  },
];

app.get("/api/v1/todo-list", (req, res) => {
  try {
    const queryParams = req.query;
    const getTodoByFields = todoList.map((element) => {
      if (Object.keys(queryParams).length !== 0) {
        let mappingTodo = {};
        for (let key in element) {
          if (Number(queryParams[key])) {
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
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.send({
      data: null,
      message: "Failed",
      success: false,
    });
  }
});

app.post("/api/v1/todo-list", (req, res) => {
  const dataBody = req.body;
  console.log(req.body);
  todoList.push({
    ...dataBody,
    id: crypto.randomUUID(),
  });
  res.send({
    data: todoList,
    message: "Success",
    success: true,
  });
});

app.get("/api/v1/todo-list/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // null, undefined, empty string, NaN, 0, false
    const findRecordTodo = todoList.find((element) => element.id === id);
    if (!findRecordTodo) {
      throw new Error("Cannot find todo");
    }
    res.send({
      data: findRecordTodo,
      message: "Success",
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

// app.put('/api/v1/todo-list/:id', (req, res) => {
//   try {
//     const body = req.body
//     const { id } = req.params
//     const findTodoItem = todoList.find(element => element.id === id)
//     if (!findTodoItem) {
//       throw new Error('Cannot find todo item')
//     }
//     for (const key in body) {
//       if (findTodoItem[key]) {
//         findTodoItem[key] = body[key]
//       }
//     }
//     res.status(201).send({
//       data: todoList,
//       message: 'Success',
//       success: true
//     })
//   } catch(error) {
//     res.status(404).send({
//       data: null,
//       message: error.message,
//       success: false
//     })
//   }
// })

app.put("/api/v1/todo-list/:id", (req, res) => {
  try {
    const bodyData = req.body;
    const { id } = req.params;
    const findTodoItem = todoList.find((element) => element.id === id);
    if (!findTodoItem) {
      throw new Error('Cannot find todo item')
    }
    for (const key in bodyData) {
      if (findTodoItem[key]) {
        findTodoItem[key] = bodyData[key]
      }
    }
    res.status(201).send({
      data: todoList,
      message: 'Success',
      success: true
    })
  } catch (error) {
    res.status(404).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.delete("/api/v1/todo-list/:id", (req, res) => {
  try {
    // step 1: tim vi tri element
    const { id } = req.params;
    const getTodoList = [...todoList];
    const findDeleteElement = getTodoList.findIndex(
      (element) => element.id === id
    );
    console.log(getTodoList);
    // step 2: check findIndex(-1, 0, 1)
    // step 3: xoa element tai vi tri (splice)
    if (findDeleteElement !== -1) {
      getTodoList.splice(findDeleteElement, 1);
      res.send({
        data: getTodoList,
        message: "Success",
        success: true,
      });
    } else {
      res.send({
        data: {},
        message: "Cannot find element",
        success: false,
      });
    }
  } catch (error) {
    res.status(404).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.listen(8000, () =>
  console.log(`Server is running at http://localhost:8000`)
);
