const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    console.log("Cookie token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, "technoNJR");

    console.log("Decoded user:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Auth error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
