const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true ,
        trim : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    
    email : {
        type : String,
        trim : true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password : {
        type : String,
        trim : true,
        required : true
    }

})

module.exports = mongoose.model('Student',studentSchema)