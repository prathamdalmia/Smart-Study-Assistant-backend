const Note = require("../models/noteModel");
const { incrementNotesCreated } = require("../utils/analyticsService");

exports.createNote = async (req, res) => {
  const note = await Note.create({
    student: req.user._id,
    title: req.body.title,
    content: req.body.content,
  });
  
  // Update analytics
  await incrementNotesCreated(req.user._id);
  
  res.json(note);
};

exports.uploadNote = async (req, res) => {
  const note = await Note.create({
    student: req.user._id,
    title: req.file.originalname,
    filePath: req.file.path,
  });
  
  // Update analytics
  await incrementNotesCreated(req.user._id);
  
  res.json(note);
};

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ student: req.user._id });
  res.json(notes);
};
