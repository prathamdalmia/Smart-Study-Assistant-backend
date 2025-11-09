const bcrypt = require("bcrypt");
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const { generateToken } = require("../utils/jwt");
const { sendMail } = require("../utils/emailService");

exports.signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existing = await Student.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, username, email, password: hash });

    
    const token = generateToken(student._id);

    res.json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password, isAdmin } = req.body;
    
    // Admin login
    if (isAdmin) {
      const admin = await Admin.findOne({ email: emailOrUsername });
      if (!admin) return res.status(401).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, admin.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = generateToken(admin._id, "admin");
      res.json({ token, admin, isAdmin: true });
      return;
    }
    
    // Student login
    const student = await Student.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!student) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(student._id);
    res.json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
