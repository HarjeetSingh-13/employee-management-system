const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    unique: true
  },
  taskRecords: [
    {
      workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true
      },
      tasks: [{
        type: String,
      }]
    }
  ]
});

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;