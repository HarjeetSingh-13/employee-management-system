const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const { markAttendance, updateAttendance, getAttendance, getAttendanceD } = require("../controllers/workerController");

// router.post("/check", protect, check);
router.post("/mark", protect, markAttendance);
router.get("/getAttendance", protect, getAttendance);
// router.get("/getByWorker/:id", protect, getWorkerAttendance);
router.get("/getAttendanceByDate/:date", protect, getAttendanceD);
router.patch("/update", protect, updateAttendance);

module.exports = router;
