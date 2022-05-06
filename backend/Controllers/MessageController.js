//IMPORT DEPENDENCY
const asyncHandler = require("express-async-handler");
// const multer = require("multer")
// const fs = require("fs")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   },
//   // fileFilter: (req, file, cb) => {
//   //   const ext = path.extname(file.originalname)
//   //   if (ext !== ".jpg" && ext !== ".png") {
//   //     return cb(res.status(400).end("only image"), false)
//   //   }
//   //   cb(null, false)
//   // }
// })

// var upload = multer({ storage: storage }).single("file")

//IMPORT MODEL
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");


//REQUEST   GET
//ROUTE     /api/Message/:chatId
//GET ALL MESSAGES 
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//REQUEST   POST
//ROUTE     /api/Message/
//CREATE NEW MESSAGE
const sendMessage = asyncHandler(async (req, res) => {

  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const uploadFile = asyncHandler(async (req, res) => {
  // const { content, chatId } = req.body;
  // const { uploadFile } = req.file;

  // res.json({
  //   chatId: chatId,
  //   content: content,
  //   uploadFile, uploadFile
  // })

});


module.exports = {
  allMessages,
  sendMessage,
  uploadFile
};
