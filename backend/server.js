//IMPORT REQUIRED
const express = require("express");
const connectDB = require("./Config/DB");
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const multer = require("multer")

//IMPORT ROUTES
const userRoutes = require("./Routes/UserRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./Routes/MessageRoutes");

//IMPORT MIDDLEWARE
const { notFound, errorHandler } = require("./Middlewares/ErrorMiddleware");

dotenv.config();
connectDB();
const app = express();

//ACCEPT JSON DATA
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: storage }).single('chat_file'))

//API ROUTES
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

//SOCKET LOGICS
io.on("connection", (socket) => {

  //CONNECTION ESTABLISHED WITH SOCKET
  console.log("Connected to socket.io");

  //SOCKET CONNECTION
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //USER JOINED CHAT ALERT
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);

  });

  //IF TYPING ALERT 
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  //NEW MESSAGE RECIEVED
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  });

  //DISCONNECTION
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
