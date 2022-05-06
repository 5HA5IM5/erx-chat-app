const express = require("express");

//IMPORT CONTROLLERS
const {
  registerUser,
  authUser,
  allUsers,
  hatim
} = require("../Controllers/UserController");

//IMPORT MIDDLEWARES
const { protect } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

//GET => /api/user
router.route("/").get(protect, allUsers);
//POST => /api/user
router.route("/").post(registerUser);
//POST => /api/login
router.post("/login", authUser);

router.get("/newroute", hatim);


module.exports = router;