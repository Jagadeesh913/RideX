const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // read cookie
    if (!token) {
      return res.status(401).json({ error: "Please login first" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // pass user to next middleware/route
    next();
  } catch (err) {
    res.status(500).json({ error: "Server error in authentication" });
  }
};

module.exports = { userAuth };
