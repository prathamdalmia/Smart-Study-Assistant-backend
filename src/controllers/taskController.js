const Task = require("../models/taskModel");

exports.addTask = async (req, res) => {
  const task = await Task.create({ ...req.body, student: req.user._id });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ student: req.user._id });
  res.json(tasks);
};
