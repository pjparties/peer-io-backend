import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "50kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// // if found matching with other user pref. then send room code
// app.get("/api/inwaitingroom/:userid", (req, res) => {
//   res.send("In waiting room");
//   // res.send(roomCode);
// }
// );

// socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("joinRoom", (roomCode) => {
    socket.join(roomCode);
    console.log(`User joined room ${roomCode}`);
  });

  socket.on("sendMessage", (roomCode, message) => {
    console.log(`Message sent in room ${roomCode}: ${message}`);
    socket.broadcast.to(roomCode).emit("receiveMessage", message);
  });

  socket.on("leaveRoom", (roomCode) => {
    console.log(`User left room ${roomCode}`);
    socket.leave(roomCode);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export default httpServer;
