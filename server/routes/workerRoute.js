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
} = require("../controllers/workerController");
// const { upload } = require("../utils/fileUpload");
// upload.single("image")
router.post("/createWorker", protect, createWorker);
router.patch("/updateWorker/:id", protect, updateWorker);
router.get("/getWorker", protect, getWorkers);
router.get("/getWorker/:id", protect, getWorker);
router.get("/getFinance/:id", protect, finance);
router.delete("/deleteWorker/:id", protect, deleteWorker);

module.exports = router;
