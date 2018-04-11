var mongoose = require("mongoose");

// get access to Schema constructor
var Schema = mongoose.Schema;

// create a new schema for our app
var schema = new Schema({
  course: {type: String, required: true},
  student: {type: String, required: true},
  assignment: {type: String, required: true},
  grade: {type: String, required: false},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

// before saving check 1) if this is a new document then set the createdAt date,
// 2) else modify the updatedAt date
schema.pre('save', function(next){
  if(!this.createdAt){
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }else{
    this.updatedAt = new Date();
  }
  next();
});

// export the model with associates name and Schema
module.exports = mongoose.model("Grade", schema);
