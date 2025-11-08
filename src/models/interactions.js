const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
    InteractionID: {
        type: String,
        required: true,
        unique: true
    },
    StudentID: {
        type: mongoose.Schema.Types.ObjectId,   // 👈 reference to Student._id
        ref: "Student",
        required: true
    },
    Query: {
        type: String,
        required: true,
        trim: true
    },
    Response: {
        type: String,
        trim: true
    },
    Timestamp: {
        type: Date,
        default: Date.now   // 👈 auto-sets current date/time
    }
});

module.exports = mongoose.model("Interaction", interactionSchema);
