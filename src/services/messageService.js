import MessageModel from "./../models/messageModel";
import UserModel from "./../models/userModel";

let createMessage = (senderId, receiverId, text) => {
  return new Promise(async (resolve, reject) => {
    
    let sender = await UserModel.findUserById(senderId);
    let receiver = await UserModel.findUserById(receiverId);

    if (!sender) {
      return reject("không tìm thấy user");
    }
    if (!receiver) {
      return reject("không tìm thấy user");
    }

    let messageModel = {
      sender: sender,
      receiver: receiver,
      type: 0, // 0 = message, 1 = image
      text: text
    }
    let message = await MessageModel.createNew(messageModel);
    console.log(message);
    if(!message) {
      return reject("Không gửi được tin nhắn");
    }
    resolve(message);
  });
};

let getMessages = (firstUserId, secondUserId, page) => {
  return new Promise(async (resolve, reject) => {
    let messages = await MessageModel.getMessages(firstUserId, secondUserId, page);
    console.log(messages);
    if (!messages) {
      return reject("Không thể lấy được tin nhắn");
    }
    resolve(messages);
  });
};

module.exports = {
  createMessage: createMessage,
  getMessages: getMessages
};
