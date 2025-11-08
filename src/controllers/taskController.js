const Task = require("../models/taskModel");
const { updateTaskAnalytics } = require("../utils/analyticsService");

exports.addTask = async (req, res) => {
  const task = await Task.create({ ...req.body, student: req.user._id });
  
  // Update analytics (especially if task is created as completed)
  await updateTaskAnalytics(req.user._id);
  
  res.json(task);
};

// Add endpoint to update task status
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, student: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    // Update analytics when task status changes
    await updateTaskAnalytics(req.user._id);
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ student: req.user._id });
  res.json(tasks);
};
