import { message } from "../services/index";

let postMessage = async (req, res) => {
  try {
    let text = req.body.text;
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    console.log(sender);
    let messageCreated = await message.createMessage(sender, receiver, text);
    if (messageCreated == null) {
      return res.sendByForm(401, "Can not create message", null);
    }
    return res.sendByForm(200, "Create message success", messageCreated);

  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not create message", null);
  }
};

let getMessages = async (req, res) => {
  try {
    let page = req.query.page;
    let firstUserId = req.body.sender;
    let secondUserId = req.body.receiver;
    let messages = await message.getMessages(firstUserId, secondUserId, parseInt(page));
    return res.sendByForm(200, "Get messages success", messages);
  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not get messages", null);
  }
}

module.exports = {
  postMessage: postMessage,
  getMessages: getMessages
};