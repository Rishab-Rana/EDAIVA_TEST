const User = require("../db/user.models")
const config = require("../config");
const jwt = require("jsonwebtoken");
module.exports=async function (req,res,next) {
  const token = req.header("auth-token")?.trim();
  if (!token) return res.status(401).send("Access Denied.");
  try {
    const decoded = await jwt.verify(token, config.JWT_KEY);
    let user = await User.findById(decoded._id);
    if (!user) return res.status(401).send("Access Denied. User not found");
    req.user = decoded;
    next();
  } catch (ex) {
    console.error(ex.message, ex)
    res.status(400).send("Invalid token");
  }
}


