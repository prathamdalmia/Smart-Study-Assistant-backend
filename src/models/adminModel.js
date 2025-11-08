const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
   
});



module.exports = mongoose.model("Admin", adminSchema);
