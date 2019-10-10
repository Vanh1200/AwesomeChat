import CommentModel from "../models/commentModel";
import CommentGroupModel from "../models/commentModel";

let postComment = async (req, res) => {
  try {
    let id = req.body.id;
    let email = req.body.email;
    let user = await UserModel.findByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    }
    if (!user.local.isActive) {
      return res.status(401).send({ success: false, msg: 'Authentication failed. User not active.' });
    }

    let checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(401).send({ success: false, msg: 'Authentication failed. Password failed.' });
    }
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(401).send({ success: false, msg: 'Authentication failed. Password failed.' });
  }
}

module.exports = 