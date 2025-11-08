const Student = require("../models/studentModel");
const Note = require("../models/noteModel");

exports.getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  await Note.deleteMany({ student: req.params.id });
  res.json({ message: "Student deleted" });
};
