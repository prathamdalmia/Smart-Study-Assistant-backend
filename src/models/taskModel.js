const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  
  student: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to Student collection
    ref: 'Student',
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date,
    
  },
 
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
