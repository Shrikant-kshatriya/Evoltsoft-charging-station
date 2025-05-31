const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const isAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    const user = await User.findById(decodedToken.id).select("-password -__v");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    // Attach user information to the request object
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      res.clearCookie("token");
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired!" });
    }
    return res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = isAuth;
