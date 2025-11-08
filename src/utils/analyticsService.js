const Analytics = require("../models/analyticsModel");

// Initialize analytics for a student if it doesn't exist
const initializeAnalytics = async (studentId) => {
  let analytics = await Analytics.findOne({ student: studentId });
  if (!analytics) {
    analytics = await Analytics.create({
      student: studentId,
      totalStudyTime: 0,
      tasksCompleted: 0,
      notesCreated: 0,
      productivityScore: 0,
    });
  }
  return analytics;
};

// Calculate productivity score based on various factors
const calculateProductivityScore = (tasksCompleted, totalTasks, notesCreated, studyTime) => {
  // Base score from task completion rate (0-50 points)
  const taskCompletionRate = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;
  const taskScore = (taskCompletionRate / 100) * 50;

  // Score from notes created (0-25 points)
  // More notes = higher score, capped at 25 points
  const notesScore = Math.min(notesCreated * 2, 25);

  // Score from study time (0-25 points)
  // More study time = higher score, 1 point per 10 minutes, capped at 25
  const studyTimeScore = Math.min((studyTime / 10), 25);

  const totalScore = taskScore + notesScore + studyTimeScore;
  return Math.min(Math.round(totalScore), 100);
};

// Update analytics when a note is created
exports.incrementNotesCreated = async (studentId) => {
  try {
    let analytics = await initializeAnalytics(studentId);
    analytics.notesCreated += 1;
    analytics.lastUpdated = new Date();
    
    // Recalculate productivity score
    const Task = require("../models/taskModel");
    const tasks = await Task.find({ student: studentId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    
    analytics.productivityScore = calculateProductivityScore(
      completedTasks,
      totalTasks,
      analytics.notesCreated,
      analytics.totalStudyTime
    );
    
    await analytics.save();
    return analytics;
  } catch (error) {
    console.error("Error updating notes created:", error);
    throw error;
  }
};

// Update analytics when a task status changes
exports.updateTaskAnalytics = async (studentId) => {
  try {
    let analytics = await initializeAnalytics(studentId);
    const Task = require("../models/taskModel");
    const tasks = await Task.find({ student: studentId });
    
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    analytics.tasksCompleted = completedTasks;
    analytics.lastUpdated = new Date();
    
    // Recalculate productivity score
    analytics.productivityScore = calculateProductivityScore(
      completedTasks,
      tasks.length,
      analytics.notesCreated,
      analytics.totalStudyTime
    );
    
    await analytics.save();
    return analytics;
  } catch (error) {
    console.error("Error updating task analytics:", error);
    throw error;
  }
};

// Update study time
exports.updateStudyTime = async (studentId, studyTimeMinutes) => {
  try {
    let analytics = await initializeAnalytics(studentId);
    analytics.totalStudyTime += studyTimeMinutes;
    analytics.lastUpdated = new Date();
    
    // Recalculate productivity score
    const Task = require("../models/taskModel");
    const tasks = await Task.find({ student: studentId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    
    analytics.productivityScore = calculateProductivityScore(
      completedTasks,
      totalTasks,
      analytics.notesCreated,
      analytics.totalStudyTime
    );
    
    await analytics.save();
    return analytics;
  } catch (error) {
    console.error("Error updating study time:", error);
    throw error;
  }
};

// Get or create analytics for a student
exports.getOrCreateAnalytics = async (studentId) => {
  return await initializeAnalytics(studentId);
};
