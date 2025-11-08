const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  
    student: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Student",
        required: true
    },
    totalStudyTime: {
        type: Number,   
        default: 0
    },
    tasksCompleted: {
        type: Number,
        default: 0
    },
    notesCreated: {
        type: Number,
        default: 0
    },
    productivityScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100   
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Analytics", analyticsSchema);
