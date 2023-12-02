const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_PRIVATE_KEY;

const verifyToken = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token =
    req.headers?.authorization || req.query?.token || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
