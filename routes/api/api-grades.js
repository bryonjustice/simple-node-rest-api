var express = require('express');
var router = express.Router();
var gradeController = require('../../controllers/gradeController');

var Grade = require('../../models/gradeModel');

const GradeService = gradeController.GradeService;

router.use(gradeController.apiSetHeaders);

// API - create :: /api/races (http verb - POST) :: insert a new race
router.post('/', gradeController.apiCreate);

// API - list :: /api/races (http verb - GET) :: read of all race announcements
router.get('/', gradeController.apiList);

// API - read :: /api/races/:raceid (http verb - GET) :: read a specific race
router.get('/:gradeid', gradeController.apiRead);

// API - update :: /api/races/edit/:raceid (http verb - PUT) :: update to an existing race
router.put('/:gradeid', gradeController.apiUpdate);

// API - delete :: /api/races/delete/:raceid (http verb - DELETE) :: delete an existing race
router.delete('/:gradeid', gradeController.apiDelete);

// export our router
module.exports = router;
