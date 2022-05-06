const express = require("express");

//IMPORT CONTROLLERS
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup
} = require("../Controllers/ChatController");

//IMPORT MIDDLEWARES
const { protect } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

//POST => /api/chat
router.route("/").post(protect, accessChat);
//GET => /api/chat
router.route("/").get(protect, fetchChats);
//POST => /api/chat/group
router.route("/group").post(protect, createGroupChat);
//PUT => /api/chat/rename
router.route("/rename").put(protect, renameGroup);
//PUT => /api/chat/groupremove
router.route("/groupremove").put(protect, removeFromGroup);
//PUT => /api/chat/groupadd
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
