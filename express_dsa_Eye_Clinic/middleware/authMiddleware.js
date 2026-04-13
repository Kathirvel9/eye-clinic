const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const authHeader = req.headers.authorization;

    // Token header validation
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = {
      UserId: decoded.UserId,
      UserName: decoded.UserName,
    };

    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Token expired. Please login again."
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Invalid token"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

module.exports = verifyToken;