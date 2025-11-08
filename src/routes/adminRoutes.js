const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/students", adminController.getAllStudents);
router.delete("/students/:id", adminController.deleteStudent);

module.exports = router;
