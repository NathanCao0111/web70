const express = require("express");
const app = express();
const port = 8000;
const session = require("express-session");
const { users, students, teachers, subjects } = require("./data");
const logMdw = require("./utils/logger");
const requireApiKey = require("./authentication/requireApiKey");
const sessionCount = require('./utils/sessionCount')

app.use(session({ secret: 'Session Count', cookie: { maxAge: 60000 }}));
app.use(logMdw({ withApiKeyInfo: true }));


app.get("/students", requireApiKey, sessionCount, (req, res) => {
  res.json(students);
});

app.get("/teachers", requireApiKey, sessionCount, (req, res) => {
  res.json(teachers);
});

app.get("/subjects", requireApiKey, sessionCount, (req, res) => {
  res.json(subjects);
});

app.get("/system/statistic", (req, res) => {
  const sessionTemplate = users.map(element => {
		return {
			user: element.username,
			students: req.session.views,
			teachers: req.session.views,
			subjects: req.session.views,
		}
	})
	res.json(sessionTemplate)
});

app.get("/", (req, res) => {
  res.send("Session 3 Workbook: Middleware");
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
