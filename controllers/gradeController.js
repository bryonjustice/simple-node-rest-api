var mongoose = require('mongoose');
var Grade = require('../models/gradeModel');

var gradeController = {};

// api :: set standard headers
gradeController.apiSetHeaders = function(req, res, next){
  res.set({
    // set API Headers
    /* -----------------------------------------------------------------------
      Cross Origin Resource Sharing (CORS) -> restriction policy.
      Key: 'Access-Control-Allow-Origin'   -> header permits domains access
      Value: '*'                           -> permits all domains.
    ------------------------------------------------------------------------*/
    'Access-Control-Allow-Origin':'*',
    /* -----------------------------------------------------------------------
      "preflighted" requests determine whether the request is safe to send.
      Key: 'Access-Control-Allow-Methods'  -> server responds w/ viable methods
      Value: 'GET,PUT,POST,DELETE,OPTIONS' -> permit these methods.

      Key: 'Access-Control-Allow-Headers'  -> server responds w/ viable headers
      Value: 'Content-Type, Access-Control-Allow-Headers' -> permit these headers.
    ------------------------------------------------------------------------*/
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
  });
  // Efficiency added to expedite handling the HTTP OPTIONS soliciting request method
  if(req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
};

// api :: list :: all Grades
gradeController.apiList = function(req, res, next){
  GradeService.list()
    .then((grades)=>{
      console.log(`API: Found documents: ${grades}`);
      res.status(200);
      res.json(grades);
    }).catch((err)=>{
      res.status(404);
      res.end();
    })
};

// api :: read :: a specific grade (id)
gradeController.apiRead = function(req, res, next){
  GradeService.read(req.params.gradeid)
    .then((grade)=>{
      console.log(`API: Found documents: ${grade}`);
      res.status(200);
      res.json(grade);
    }).catch((err)=>{
      res.status(404);
      res.end();
    })
};

// api :: create :: a new grade
gradeController.apiCreate = function(req, res, next){
  // key-value pairs of data submitted in the request body

	var formdata = {
		course: req.body.course,
		student: req.body.student,
		assignment: req.body.assignment,
		grade: req.body.grade
	}
  // set a grade from the Model with the data collected
  var grade = new Grade(formdata);
  // save the revisions then redirect back to the full list of grades
  grade.save()
  .then((grade)=>{
    console.log(`API: created document: ${grade}`);
    res.status(201);
    res.json(grade);
  }).catch((err)=>{
    res.status(400);
    res.end();
  })
};

// api :: update :: an existing grade
gradeController.apiUpdate = function(req, res, next){
  console.log("api/grades put: _id=" + req.params.gradeid);
  let formdata = req.body;
  console.log(formdata);
  GradeService.update(req.params.gradeid, formdata)
    .then((updatedGrade)=>{
      console.log(updatedGrade);
      res.status(200);
      res.json(updatedGrade);
    }).catch((err)=>{
      res.status(404);
      res.end();
    })
};

// api :: delete :: an existing grade
gradeController.apiDelete = function(req, res, next){
  console.log("api/grades del: _id=" + req.params.gradeid);
  GradeService.delete(req.params.gradeid)
  .then((grade)=>{
      console.log('delete api/grades/:gradeid ${grade}');
      res.status(200);
      res.json(grade);
  }).catch((err)=>{
    res.status(404);
    res.end();
  })
};

// GradeService class :: provides CRUD operations for API and UI
class GradeService{

  // list :: all Grades
  static list(){
    console.log('GradeService.list');
    return Grade.find({})
      .then((grades)=>{
        return grades;
      });
  }

  // create :: create a Grade
  static create(obj){
    console.log('GradeService.create');
    var grade = new Grade(obj);
    return grade.save();
  }

  // read :: a specific grade (id)
  static read(id){
    console.log('GradeService.read');
    return Grade.findById(id)
      .then((grade)=>{
        return grade;
      });
  }

  // update :: a specific grade (id)
  static update(id, data){
    console.log('GradeService.update');
    return Grade.findById(id)
      .then((grade)=>{
        grade.set(data);
        grade.save();
        return grade;
      });
  }

  //  delete :: a specific grade (id)
  static delete(id){
    console.log('API - GradeService.delete');
    return Grade.remove({_id: id})
      .then((obj)=>{
        return obj;
      });
  }

}

module.exports = gradeController;
module.exports.GradeService = GradeService;
