const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

router.use(protect);
router.post("/", taskController.addTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);

module.exports = router;
