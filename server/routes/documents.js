const router = require("express").Router();
const { User, validate } = require("../schemas/User");
const bcrypt = require("bcrypt");
const Document = require("../schemas/Document");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_PRIVATE_KEY;

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("Unauthorized: No token provided"));
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(new Error("Unauthorized: Invalid token"));
      }

      resolve(decoded);
    });
  });
};

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = await verifyToken(token);
    console.log(decoded._id);
    const documents = await Document.find({ creator_id: decoded._id });
    res.status(200).send(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

router.put("/", async (req, res) => {
  try {
    const { newName, docId } = req.body;
    const filter = { _id: docId };
    const update = { name: newName };
    console.log({ newName });
    const updatedDocument = await Document.findByIdAndUpdate(docId, update);
    console.log({ updatedDocument });

    if (updatedDocument) {
      res.status(200).json({
        message: "Document updated successfully",
        updatedDocument,
      });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    console.log("delete req");
    const { docId } = req.body;
    console.log(req.body);
    const filter = { _id: docId };
    await Document.deleteOne(filter);
    res.status(200).json({ message: "Document was deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Document not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { doc_id, doc_name } = req.body;
    const token = req.headers.token;
    const decoded = await verifyToken(token);
    const userId = decoded._id;
    console.log(userId, doc_id, doc_name);
    await Document.create({
      _id: doc_id,
      creator_id: userId,
      name: doc_name,
      data: "",
    });
    res.status(200).json({ message: "Document was created successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Can't create the document" });
  }
});

module.exports = router;
