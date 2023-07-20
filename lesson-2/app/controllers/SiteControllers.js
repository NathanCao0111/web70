const crypto = require('crypto')
const { students, teachers } = require('../../data')
const randomNameGenerator = require('../../utils/RandomName')

class SiteControllers {
  index(req, res) {
		console.log(req.query)
    res.send("du ma");
  }

  students(req, res) {
		res.json(students);
  }
	
	studentsAdd(req, res) {
		const newStudent = {
			id: crypto.randomUUID(),
			name: randomNameGenerator(8),
			createdAt: new Date()
		}
		
		students.push(newStudent)
		
		res.json({
			data: {},
			message: 'Add successfully',
			success: true
		})
	}

  teachers(req, res) {
    res.json(teachers);
  }

	teachersAdd(req, res) {
		const newTeacher = {
			id: crypto.randomUUID(),
			name: randomNameGenerator(8),
			createdAt: new Date()
		}

		teachers.push(newTeacher)

		res.json({
			data: {},
			message: 'Add successfully',
			success: true
		})
	}

	single(req, res) {
		console.log(req.params)
		res.send('Single page')
	}

	classes(req, res) {
		console.log(req.params)
		res.send('Classes')
	} 

	class(req, res) {
		console.log(req.params)
		res.send(`Class ${req.params.classId}`)
	}
}

module.exports = new SiteControllers();
