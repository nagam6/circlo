
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const conditionReportsRouter = require("./routes/conditionReports");
const itemsRouter = require("./routes/items");
const authRouter = require("./routes/auth");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Circlo API is running",
  });
});

app.use("/api/condition-reports", conditionReportsRouter);
app.use("/api/items", itemsRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exitCode = 1;
  }
};

startServer();