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

module.exports = router;
