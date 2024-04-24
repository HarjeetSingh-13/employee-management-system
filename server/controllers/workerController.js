const asyncHandler = require("express-async-handler");
const Worker = require("../models/workerModel.js");
// const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;

// Create worker
const createWorker = asyncHandler(async (req, res) => {
  const { name, phoneNumber, age, salary } = req.body;

  //   Validation
  if (!name || !phoneNumber || !age || !salary) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // // Handle Image upload
  // let fileData = {};
  // if (req.file) {
  //   // Save image to cloudinary
  //   let uploadedFile;
  //   try {
  //     uploadedFile = await cloudinary.uploader.upload(req.file.path, {
  //       folder: "Pinvent App",
  //       resource_type: "image",
  //     });
  //   } catch (error) {
  //     res.status(500);
  //     throw new Error("Image could not be uploaded");
  //   }

  //   fileData = {
  //     fileName: req.file.originalname,
  //     filePath: uploadedFile.secure_url,
  //     fileType: req.file.mimetype,
  //     fileSize: fileSizeFormatter(req.file.size, 2),
  //   };
  // }

  // Create Worker
  const worker = await Worker.create({
    employer: req.body.employerId,
    name,
    phoneNumber,
    age,
    salary,
    attendance: [{ date: "0", status: "not-marked" }],
    // image: fileData,
  });

  res.status(201).json(worker);
});

// Get all Workers
const getWorkers = asyncHandler(async (req, res) => {
  const Workers = await Worker.find({ employer: req.body.employerId }).sort(
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
  if (worker.employer.toString() !== req.body.employerId) {
    res.status(401);
    throw new Error("User not authorized");
  }
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
  if (worker.employer.toString() !== req.body.employerId) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await worker.deleteOne();
  res.status(200).json({ message: "Worker deleted." });
});

// Update Worker
const updateWorker = asyncHandler(async (req, res) => {
  const { name, phoneNumber, age, salary, description } = req.body;
  const { id } = req.params;

  const worker = await Worker.findById(id);

  // if Worker doesnt exist
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  // Match Worker to its user
  if (worker.user.toString() !== req.body.employerId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // // Handle Image upload
  // let fileData = {};
  // if (req.file) {
  //   // Save image to cloudinary
  //   let uploadedFile;
  //   try {
  //     uploadedFile = await cloudinary.uploader.upload(req.file.path, {
  //       folder: "Pinvent App",
  //       resource_type: "image",
  //     });
  //   } catch (error) {
  //     res.status(500);
  //     throw new Error("Image could not be uploaded");
  //   }

  //   fileData = {
  //     fileName: req.file.originalname,
  //     filePath: uploadedFile.secure_url,
  //     fileType: req.file.mimetype,
  //     fileSize: fileSizeFormatter(req.file.size, 2),
  // };
  // }

  // Update Worker
  const updatedWorker = await Worker.findByIdAndUpdate(
    { _id: id },
    {
      name,
      phoneNumber,
      age,
      salary,
      description,
      // image: Object.keys(fileData).length === 0 ? Worker?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedWorker);
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
  // const existingAttendance = worker.attendance.find(
  //   (a) => a.date.toDateString() === new Date(date).toDateString()
  // );
  const existingAttendance = worker.attendance.find((a) => a.date == date);
  if (existingAttendance) {
    // res.status(401).json("attendance already marked");
    existingAttendance.status = status;
  } else {
    worker.attendance.push({ date, status });
  }
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
  // const existingAttendance = worker.attendance.find(
  //   (a) => a.date.toDateString() === new Date(date).toDateString()
  // );
  // const existingAttendance = worker.attendance.find((a) => a.date == date);
  // if (existingAttendance) {
    // res.status(401).json("attendance already marked");
  //   existingAttendance.status = status;
  // } else {
  //   worker.attendance.push({ date, status });
  // }
  // const result = await worker.save();
  return res.status(200).json(worker.attendance);
});

//get attendance by date
const getAttendanceD = asyncHandler(async (req,res) => {
  const worker = await Worker.findById(req.body.id);
  if(!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  const attendance = worker.attendance.find((a)=> a.date === req.params.date);
  if(attendance){
    res.status(200).json(attendance)
  }else{
    res.status(404);
    throw new Error("Attendance on give date not found");
  }
})

const finance = asyncHandler(async (req,res) => {
  const worker = await Worker.findById(req.params.id);
  if(!worker){
    res.status(400);
    throw new Error("Worker not found");
  }
  const workingdays = worker.attendance.reduce((count, attendance) => count + (attendance.status === "present"), 0);
  const salary = (worker.salary * workingdays) - worker.loan
  res.json({workingdays,salary});
})

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
