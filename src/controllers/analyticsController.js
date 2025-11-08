const Analytics = require("../models/analyticsModel");
const { getOrCreateAnalytics, updateTaskAnalytics, updateStudyTime } = require("../utils/analyticsService");

exports.getAnalytics = async (req, res) => {
  try {
    // Ensure analytics exist and are up-to-date
    let analytics = await getOrCreateAnalytics(req.user._id);
    
    // Sync task analytics to ensure accuracy
    await updateTaskAnalytics(req.user._id);
    
    // Get updated analytics
    analytics = await Analytics.findOne({ student: req.user._id });
    
    res.json(analytics || {
      student: req.user._id,
      totalStudyTime: 0,
      tasksCompleted: 0,
      notesCreated: 0,
      productivityScore: 0,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update study time
exports.updateStudyTime = async (req, res) => {
  try {
    const { studyTimeMinutes } = req.body;
    
    if (!studyTimeMinutes || studyTimeMinutes < 0) {
      return res.status(400).json({ message: "Invalid study time" });
    }
    
    const analytics = await updateStudyTime(req.user._id, studyTimeMinutes);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
