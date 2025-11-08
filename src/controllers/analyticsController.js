const Analytics = require("../models/analyticsModel");

exports.getAnalytics = async (req, res) => {
  const data = await Analytics.findOne({ student: req.user._id });
  res.json(data);
};
