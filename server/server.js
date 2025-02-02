require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Исправление предупреждения Mongoose
mongoose.set('strictQuery', false);

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:8081" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("MongoDB connection error:", err));

// Роуты
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});