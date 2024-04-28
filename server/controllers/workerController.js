const asyncHandler = require("express-async-handler");
const Worker = require("../models/workerModel.js");

// Create worker
const createWorker = asyncHandler(async (req, res) => {
  const { name, phoneNumber, age, salary } = req.body;

  //   Validation
  if (!name || !phoneNumber || !age || !salary) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Worker
  const worker = await Worker.create({
    employer: req.user._id,
    name,
    phoneNumber,
    age,
    salary,
    // image: fileData,
  });

  res.status(201).json(worker);
});

// Get all Workers
const getWorkers = asyncHandler(async (req, res) => {
  const Workers = await Worker.find({ employer: req.user._id }).sort(
    "-createdAt"
  );
  res.status(200).json(Workers);
});

// Get single Worker
const getWorker = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  // if Worker doesnt exist
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  // Match Worker to its user
  if (worker.employer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // console.log("worker found");
  res.status(200).json(worker);
});

// Delete Worker
const deleteWorker = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  // if Worker doesnt exist
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  // Match Worker to its user
  if (worker.employer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await worker.deleteOne();
  res.status(200).json({ message: "Worker deleted." });
});

// Update Worker
const updateWorker = asyncHandler(async (req, res) => {
  // const { name, phoneNumber, age  } = req.body;
  const { id } = req.params;

  const worker = await Worker.findById(id);

  // if Worker doesnt exist
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  // Match Worker to its user
  if (worker.employer.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (worker) {
    const { name, phoneNumber, age } = worker;
    worker.name = req.body.name || name;
    worker.phoneNumber = req.body.phoneNumber || phoneNumber;
    worker.age = req.body.age || age;
    // console.log(worker.phoneNumber);

    const updatedworker = await worker.save();
    res.status(200).json({
      _id: updatedworker._id,
      name: updatedworker.name,
      phoneNumber: updatedworker.phoneNumber,
      age: updatedworker.age,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//mark attendance
const markAttendance = asyncHandler(async (req, res) => {
  const { status, date } = req.body;

  const worker = await Worker.findById(req.body.id);

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  // const existingAttendance = worker.attendance.find(
  //   (a) => a.date.toDateString() === new Date(date).toDateString()
  // );
  const existingAttendance = worker.attendance.find((a) => a.date == date);
  if (existingAttendance) {
    res.status(401).json("attendance already marked");
    // existingAttendance.status = status;
  } else {
    worker.attendance.push({ date, status });
  }
  console.log("marked");
  const result = await worker.save();
  return res.status(200).json(result);
});

//update attendance
const updateAttendance = asyncHandler(async (req, res) => {
  const { status, date } = req.body;

  const worker = await Worker.findById(req.body.id);

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  const existingAttendance = worker.attendance.find((a) => a.date == date);
  existingAttendance.status = status;

  const result = await worker.save();
  return res.status(200).json(result);
});

//get attendance
const getAttendance = asyncHandler(async (req, res) => {
  // const { status, date } = req.body;

  const worker = await Worker.findById(req.body.id);

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  return res.status(200).json(worker.attendance);
});

//get attendance by date
const getAttendanceD = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.body.id);
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  const attendance = worker.attendance.find((a) => a.date === req.params.date);
  if (attendance) {
    res.status(200).json(attendance);
  } else {
    res.status(404);
    throw new Error("Attendance on give date not found");
  }
});

const finance = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) {
    res.status(400);
    throw new Error("Worker not found");
  }
  const workingdays = worker.attendance.reduce(
    (count, attendance) => count + (attendance.status === "present"),
    0
  );
  const salary = worker.salary * workingdays - worker.loan;
  res.json({ workingdays, salary });
});

module.exports = {
  createWorker,
  getWorkers,
  getWorker,
  deleteWorker,
  updateWorker,
  markAttendance,
  updateAttendance,
  getAttendance,
  getAttendanceD,
  finance,
};
