/**
 * 
 * @param io from socket.io lib 
 */
let sendMessage = (io) => {
  io.on("connect", (socket) => {
    console.log("connection by vanh1200")
    socket.on("send-message", (data) => {
      console.log(data);
    });
  })
}

module.exports = sendMessage;