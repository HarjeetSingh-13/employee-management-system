const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createWorker,
  getWorkers,
  getWorker,
  deleteWorker,
  updateWorker,
} = require("../controllers/WorkerController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createWorker);
router.patch("/:id", protect, upload.single("image"), updateWorker);
router.get("/", protect, getWorkers);
router.get("/:id", protect, getWorker);
router.delete("/:id", protect, deleteWorker);

module.exports = router;
