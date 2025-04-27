const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const AppError = require("./utils/appErrors");
const app = express();
const cors = require("cors");
const axios = require("axios");
const chatController = require("./controllers/chat");
const authRoutes = require("./routes/auth"); // Add this line to import auth routes

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

// Use auth routes
app.use("/api/auth", authRoutes);

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

/*const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const AppError = require("./utils/appErrors");
const app = express();
const cors = require("cors");
const axios = require("axios");
const chatController = require("./controllers/chat");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
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

app.use("/api/auth", authRoutes);

module.exports = app;
*/
