
let numUsersTyping = 0;
/**
 * 
 * @param io from socket.io lib 
 */
let sendComment = (io) => {
  io.on("connect", (socket) => {
    console.log("connection by vanh1200 at comment")

    socket.on("comment typing", (trailerId) => {
      console.log("Someone is typing!");
      socket.broadcast.emit("comment typing", trailerId);
      ++numUsersTyping;
      console.log("Number typing: " + numUsersTyping);
    });

    socket.on("comment stop typing", (trailerId) => {
      console.log("Someone stopped typing")
      if (numUsersTyping > 0)
        --numUsersTyping;
      console.log("Number typing: " + numUsersTyping);
      if (numUsersTyping == 0) {
        socket.broadcast.emit("comment stop typing", trailerId);
        console.log("Everyone has stopped typing");
      }
    });

    socket.on("new comment", (data) => {
      console.log("new comment with data: " + data);
      socket.broadcast.emit("new comment", data)
    });

  })
}

module.exports = sendComment;