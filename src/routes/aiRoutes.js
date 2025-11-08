const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const aiController = require("../controllers/aiController");

router.use(protect);
router.post("/chat", aiController.chat);
router.post("/summarize", aiController.summarize);
router.post("/quiz", aiController.quiz);

module.exports = router;
