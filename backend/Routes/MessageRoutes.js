const express = require("express");

//IMPORT CONTROLLERS
const {
  allMessages,
  sendMessage,
  uploadFile
} = require("../Controllers/MessageController");

//IMPORT MIDDLEWARES
const { protect } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

//GET => /api/message/:chatId
router.route("/:chatId").get(protect, allMessages);
//GET => /api/message
router.route("/").post(protect, sendMessage);
//GET => /api/message/uploads
router.route("/uploads").post(protect, uploadFile);


module.exports = router;
