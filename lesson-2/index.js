
const express = require('express')
const app = express()
const port = 5000
const route = require('./routes')

// config res.body
app.use(express.urlencoded({
	extended: true
})) //form data
app.use(express.json()) //js, json data

// route init
route(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))