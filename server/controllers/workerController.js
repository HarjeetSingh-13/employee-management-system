const asyncHandler = require("express-async-handler");
const Worker = require("../models/workerModel.js");
const Employer = require("../models/employerModel.js");

// Create worker
const createWorker = asyncHandler(async (req, res) => {
  const { name, phoneNumber, age, payRate, photo } = req.body;

  //   Validation
  if (!name || !phoneNumber || !age || !payRate) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Worker
  const worker = await Worker.create({
    employer: req.user._id,
    name,
    phoneNumber,
    age,
    payRate,
    photo
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
    const { name, phoneNumber, age, photo } = worker;
    worker.name = req.body.name || name;
    worker.phoneNumber = req.body.phoneNumber || phoneNumber;
    worker.age = req.body.age || age;
    worker.photo = req.body.photo || photo;
    // console.log(worker.phoneNumber);

    const updatedworker = await worker.save();
    res.status(200).json({
      _id: updatedworker._id,
      name: updatedworker.name,
      phoneNumber: updatedworker.phoneNumber,
      age: updatedworker.age,
      photo: updatedworker.photo,
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

  const existingAttendance = worker.attendance.find((a) => a.date == date);
  if (existingAttendance) {
    res.status(401).json("attendance already marked");
  } else {
    const employer = await Employer.findById(req.user._id.toString());
    employer.attendance.push({ date });
    await employer.save();
    worker.attendance.push({ date, status });
  }
  const result = await worker.save();
  return res.status(200).json(result);
});

//update attendance
const updateAttendance = asyncHandler(async (req, res) => {
  const { status, date } = req.body;
  console.log(date);

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

const addLoan = asyncHandler(async (req, res) => {
  const { date, reason, amount } = req.body;
  const worker = await Worker.findById(req.params.id);
  // const employer = await Employer.findById(req.user._id);
  // console.log("in");
  if (!worker) {
    res.status(400);
    throw new Error("Worker not found");
  } else {
    worker.loan.push({ date, reason, amount });
    // console.log(employer);
    // employer.totalLoan += amount;
    // console.log(worker);
  }
  // await employer.save();
  const result = await worker.save();
  return res.status(200).json(result);
});

// const getLoan = asyncHandler(async (req,res) => {
//   const worker = await Worker.findById(req.body.id);

//   if (!worker) {
//     res.status(404);
//     throw new Error("Worker not found");
//   }
//   return res.status(200).json(worker.loan);
// })

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
  const loanRecord = worker.loan;
  const salary = worker.payRate * workingdays;
  const loan = worker.loan.reduce((count, loan) => count + loan.amount, 0);
  const prevRemainingSalary = worker.prevRemainingSalary;
  const netSalary = salary - loan + prevRemainingSalary;
  const photo = worker.photo;
  // console.log(loan,netSalary);
  res.json({
    workingdays,
    salary,
    loan,
    netSalary,
    loanRecord,
    prevRemainingSalary,
    photo,
  });
});

const paySalary = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) {
    res.status(400);
    throw new Error("Worker not found");
  }
  const amount = req.body.amount;
  const netSalary = req.body.netSalary;
  worker.prevRemainingSalary += netSalary - amount;
  worker.loan = [];
  worker.attendance = [];
  const result = await worker.save();
  return res.status(200).json(result);
});

const getDashboardInfo = asyncHandler(async (req, res) => {
  const workers = await Worker.find({ employer: req.user._id }).sort(
    "-createdAt"
  );
  const employer = await Employer.findById(req.user._id.toString());
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const lastAttendance = employer.attendance.slice(-1);

  const attendance = lastAttendance[0].date === formattedToday;

  const totalRemainingPayment = workers.reduce(
    (count, worker) => count + worker.prevRemainingSalary,
    0
  );
  const totalLoan = workers.reduce(
    (count, worker) =>
      count + worker.loan.reduce((c, loan) => c + loan.amount, 0),
    0
  );
  res.status(200).json({ totalRemainingPayment, totalLoan, attendance });
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
  addLoan,
  paySalary,
  getDashboardInfo,
};
