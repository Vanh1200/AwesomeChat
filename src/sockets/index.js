import sendMessage from "./chat/sendMessage";

/**
 * 
 * @param io  from socket.io lib
 */

let initSockets = (io) => {
  sendMessage(io);
  // todo add more socket if ness
}

module.exports = initSockets;