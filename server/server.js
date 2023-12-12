const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const docsRoutes = require("./routes/documents");
const connectToDatabase = require("./database/db");
const setupSocket = require("./socket/socket");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

connectToDatabase();

setupSocket();

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/documents", docsRoutes);

app.post("/api/userstest", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
