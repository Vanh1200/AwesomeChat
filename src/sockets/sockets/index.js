import sendMessage from "./chat/sendMessage";
import sendComment from "./comment/sendComment";

/**
 * 
 * @param io  from socket.io lib
 */

let initSockets = (io) => {
  sendMessage(io);
  sendComment(io);
  // todo add more socket if ness
}

module.exports = initSockets;