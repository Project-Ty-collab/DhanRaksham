const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from config.env
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION");

  process.exit(1);
});

// Require app AFTER dotenv, BEFORE using any routes
const app = require("./app");

// NOW load routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const portnumber = 3001;
const server = app.listen(portnumber, () => {
  console.log("App is running on port 3001");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION");
  server.close(() => {
    process.exit(1);
  });
});
