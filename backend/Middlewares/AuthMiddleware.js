//IMPORT HELPER FUNCTIONS
const jwt = require("jsonwebtoken");

//IMPORT DEPENDENCY
const asyncHandler = require("express-async-handler");

//IMPORT MODELS
const User = require("../Models/userModel.js");

//MIDDLEWARE TO CHECK FOR AUTHORIZATION
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //DECODE JWT TOKEN ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token Recieved");
  }
});

module.exports = { protect };
