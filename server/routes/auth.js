const router = require("express").Router();
const { User } = require("../schemas/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
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

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid email or password." });
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Login successful." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
});

router.post("/verify-token", async (req, res) => {
  const token = req.query.token;
  console.log(token, secretKey);
  try {
    const decoded = await verifyToken(token);
    res.status(200).json({ decoded });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
