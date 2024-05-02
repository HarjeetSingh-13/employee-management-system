const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createWorker,
  getWorkers,
  getWorker,
  deleteWorker,
  updateWorker,
  finance,
  addLoan,
  paySalary,
  getDashboardInfo,
} = require("../controllers/workerController");
// const { upload } = require("../utils/fileUpload");
// upload.single("image")
router.post("/createWorker", protect, createWorker);
router.patch("/updateWorker/:id", protect, updateWorker);
router.get("/getWorker", protect, getWorkers);
router.get("/getWorker/:id", protect, getWorker);
router.get("/getFinance/:id", protect, finance);
router.post("/addloan/:id", protect, addLoan);
router.post("/paysalary/:id", protect, paySalary);
// router.post("/getloan/:id", protect, getLoan);
router.delete("/deleteWorker/:id", protect, deleteWorker);
router.get("/getdashboardinfo", protect, getDashboardInfo);

module.exports = router;
