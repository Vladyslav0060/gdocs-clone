const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Document = require("./schemas/Document");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const docsRoutes = require("./routes/documents");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCollection = process.env.DB_COLLECTION;

console.log(dbUser, dbPassword, dbCollection);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@gdocscluster.l5mmayw.mongodb.net/${dbCollection}?retryWrites=true&w=majority`
  )
  .then(() => console.log("CONNECTED TO MONGO DB"))
  .catch((err) => console.log(err));

const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId, token) => {
    const document = await findOrCreateDocument(documentId, token);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
      console.log(delta);
    });
    socket.on("save-document", async (data) => {
      console.log(data, Date.now().toString());
      await Document.findByIdAndUpdate(documentId, {
        data,
        updated_at: Date.now().toString(),
      });
    });
  });
  console.log("connected");
});

const defaultValue = "";

async function findOrCreateDocument(id, token) {
  console.log({ id });
  if (id == null) return;
  console.log(token);
  const user = jwt.decode(token);
  console.log(user);
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({
    _id: id,
    name: "Test name",
    creator_id: user._id,
    data: defaultValue,
  });
}

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//routes

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
