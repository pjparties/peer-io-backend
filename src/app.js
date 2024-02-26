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

io.sockets.on("connection", (socket) => {
  function log() {
    var array = ["Message from server:"];
    array.push.apply(array, arguments);
    socket.emit("log", array);
  }

  //Defining Socket Connections
  socket.on("message", (message, room) => {
    log("Client said: ", message);
    // for a real app, would be room-only (not broadcast)
    socket.in(room).emit("message", message, room);
  });

  socket.on("create or join", (room, clientName) => {
    log("Received request to create or join room " + room);
    var clientsInRoom = io.sockets.adapter.rooms.get(room);
    var numClients = clientsInRoom ? clientsInRoom.size : 0;
    log("Room " + room + " now has " + numClients + " client(s)");

    if (numClients === 0) {
      socket.join(room);
      log("Client ID " + socket.id + " created room " + room);
      socket.emit("created", room, socket.id);
    } else if (numClients === 1) {
      log("Client ID " + socket.id + " joined room " + room);
      //this message ("join") will be received only by the first client since the client has not joined the room yet
      io.sockets.in(room).emit("join", room, clientName); //this client name is the name of the second client who wants to join
      socket.join(room);
      //this mesage will be received by the second client
      socket.emit("joined", room, socket.id);
      //this message will be received by two cleints after the join of the second client
      io.sockets.in(room).emit("ready");
    } else {
      // max two clients
      socket.emit("full", room);
    }
  });

  socket.on("creatorname", (room, client) => {
    // to all clients in room1 except the sender
    socket.to(room).emit("mynameis", client);
  });

  socket.on("ipaddr", () => {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function (details) {
        if (details.family === "IPv4" && details.address !== "127.0.0.1") {
          socket.emit("ipaddr", details.address);
        }
      });
    }
  });

  socket.on("bye", () => {
    console.log("received bye");
  });

  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });
  socket.on("disconnect", () => {
    // socket.rooms.size === 0
  });
});

// define routes
// import
// app.use("/api/v1/<address>", <router>);

export default httpServer;
