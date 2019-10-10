import CommentModel from "../models/commentModel";

let postComment = async (req, res) => {
  try {
    let id = req.body.id;
    let email = req.body.email;
    let user = await UserModel.findByEmail(email);
    
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(401).send({ success: false, msg: 'Authentication failed. Password failed.' });
  }
}

let getComments = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  postComment: postComment,
  getComments: getComments
};