const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const AppError = require("./utils/appErrors");
const app = express();
const cors = require("cors");
const axios = require("axios");
const chatController = require("./controllers/chat");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(fileUpload());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

// Route to call the predict_insurance API from the Flask server
app.post("/api/predict_insurance", async (req, res, next) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/predict_insurance",
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      message: "Failed to call the predict_insurance API",
    });
  }
});

// Route to call the budget optimization API from the Flask server
app.post("/api/optimize_budget", async (req, res, next) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/optimize_budget",
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      message: "Failed to call the budget optimization API",
    });
  }
});

// Route for batch budget optimization
app.post("/api/batch_optimize_budget", async (req, res, next) => {
  try {
    const formData = new FormData();
    formData.append('file', req.files.file);
    
    const response = await axios.post(
      "http://localhost:5000/batch_optimize_budget",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      message: "Failed to call the batch budget optimization API",
    });
  }
});

// Finance API routes
app.post("/api/finance", chatController.getFinanceResponse);
app.post(
  "/api/finance/structured",
  chatController.getStructuredFinanceResponse
);
app.post("/api/finance/unified", chatController.getUnifiedFinanceResponse);
// app.post("/api/chat", chatController.getGeneralResponse);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});

module.exports = app;
