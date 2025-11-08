const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

router.use(protect);
router.post("/create", noteController.createNote);
router.post("/upload", upload.single("file"), noteController.uploadNote);
router.get("/", noteController.getNotes);

module.exports = router;
