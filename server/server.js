const mongoose = require("mongoose");
const Document = require("./schemas/Document");
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
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
      console.log(delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
  console.log("connected");
});

const defaultValue = "";

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
