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
  console.log("a user connected", socket.id);
  socket.on("join-room", ({roomId,userId}) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
  });
  socket.on("send-message",({roomId,msg})=>{
    console.log("message received",msg, "at room",roomId);
    socket.to(roomId).emit("receive-message",msg);
  })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    socket.to(roomId).emit("user-disconnected", userId);
    socket.disconnect();
  });
});

export default httpServer;
