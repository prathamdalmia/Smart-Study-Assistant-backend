const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    
    student: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Student',
        required: true
      },
    title : {
        type : String,
        required : true,
        trim : true
    },
   
    content : {
        type : String,
        trim : true
    },
    filePath  : {
        type : String,
        trim : true,
        required : false
    },
    


},
{ timestamps: true });

module.exports = mongoose.model('Note',noteSchema)