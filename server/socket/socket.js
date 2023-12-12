// socket/socket.js

const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const Document = require("../schemas/Document");

const setupSocket = () => {
  const io = socketIO(3001, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("get-document", async (documentId, token) => {
      const document = await findOrCreateDocument(documentId, token);
      socket.join(documentId);
      socket.emit("load-document", document);
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
};

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

module.exports = setupSocket;
