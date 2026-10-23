const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const boardsRoutes = require("./routes/boards");
const listsRoutes = require("./routes/lists");
const cardsRoutes = require("./routes/cards");

const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

// Rotte principali

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardsRoutes);
app.use("/api/lists", listsRoutes);
app.use("/api/cards", cardsRoutes);

module.exports = app;
