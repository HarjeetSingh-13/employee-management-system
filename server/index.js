const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const employerRoute = require("./routes/employerRoute");
const workerRoute = require("./routes/workerRoute");
const attendanceRoute = require("./routes/attendanceRoute");
// const contactRoute = require("./routes/contactRoute");
// const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
// const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500/Project/reactapp/frontend/test.html",
    ],
    credentials: true,
  })
);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/employers", employerRoute);
app.use("/api/workers", workerRoute);
app.use("/api/workers", attendanceRoute);
// app.use("/api/tasks", taskRoute);
// app.use("/api/attendance", attendanceRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
// app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
