const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    payRate: {
      type: Number,
      required: true,
    },
    prevRemainingSalary: {
      type: Number,
      default: 0,
    },
    loan: [{
      date: {
        type: String,
      },
      reason: {
        type: String,
      },
      amount: {
        type: Number,
      }
    }],
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
    attendance: [{
      date: {
          type: String,
      },
      status: {
          type: String,
          enum: ['present', 'absent', 'not-marked'],
          default: 'not-marked',
      },
  }]
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model("Worker", workerSchema);
module.exports = Worker;
