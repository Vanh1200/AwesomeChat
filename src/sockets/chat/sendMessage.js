/**
 * 
 * @param io from socket.io lib 
 */

let sendMessage = (io) => {
  io.on("connect", (socket) => {
    console.log("connection by vanh1200 at message")

    socket.on("chat typing", (data) => {
      console.log("opponent is typing!");
      socket.broadcast.emit("chat typing", data);
    });

    socket.on("chat stop typing", (data) => {
      console.log("opponent stopped typing")
      socket.broadcast.emit("chat stop typing", data);
    });

    socket.on("new message", (data) => {
      console.log("new message with data: " + data);
      socket.broadcast.emit("new message", data)
    });

  })
}

module.exports = sendMessage;