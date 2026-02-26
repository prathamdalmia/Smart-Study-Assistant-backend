const jwt = require("jsonwebtoken");

exports.generateToken = (userId, type = "student") => {
  return jwt.sign({ id: userId, type }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
