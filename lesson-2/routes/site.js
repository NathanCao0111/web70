
const express = require('express')
const router = express.Router()

const siteControllers = require('../app/controllers/SiteControllers')

router.get('/students', siteControllers.students)
router.get('/students/add', siteControllers.studentsAdd)
router.get('/teachers', siteControllers.teachers)
router.get('/teachers/add', siteControllers.teachersAdd)
router.get('/:id', siteControllers.single)
router.get('/:id/classes', siteControllers.classes)
router.get('/:id/classes/:classId', siteControllers.class)
router.get('/', siteControllers.index)

module.exports = router