import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

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

// socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  // user connected
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log("a user connected", id);


  // send message
  socket.on("send-message", ({ user2, msg }) => {
    socket.broadcast.to(user2).emit("receive-message", {
      msg,
      user1: id,
      sender: user2,
    });
  });

  // typing
  socket.on("typing", ({ user2 }) => {
    socket.broadcast.to(user2).emit("typing", {
      user1: id,
    });
  });

  // user disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// define routes
// import
// app.use("/api/v1/<address>", <router>);

export default httpServer;
