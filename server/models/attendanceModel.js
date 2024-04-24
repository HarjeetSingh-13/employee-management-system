// const mongoose = require('mongoose');
// const attendanceSchema = new mongoose.Schema({
//   date: {
//     type: Date,
//     default: Date.now,
//     unique: true
//   },
//   attendanceRecords: [
//     {
//       studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Worker",
//         required: true
//       },
//       attendance: {
//         type: String,
//         enum: ["present", "absent"],
//         required: true
//       }
//     }
//   ]
// });

// const Attendance = mongoose.model('Attendance', attendanceSchema);

// module.exports = Attendance;