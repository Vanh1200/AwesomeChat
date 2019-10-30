import CommentModel from "./../models/commentModel";
import {transComment} from "../../lang/vi";
import UserModel from "./../models/userModel";

let createComment = (trailerId, userId, content) => {
  return new Promise(async (resolve, reject) => {
    
    let user = await UserModel.findUserById(userId);
    if (!user) {
      return reject(transComment.comments_not_found_user);
    }

    let commentItem = {
      trailerId: trailerId,
      user: user,
      content: content
    }
    let comment = await CommentModel.createNew(commentItem);
    console.log(comment);
    if(!comment) {
      return reject(transComment.comment_not_created);
    }
    resolve(comment);
  });
};

let getComments = (trailerId, page) => {
  return new Promise(async (resolve, reject) => {
    let comments = await CommentModel.getCommentsByTrailerId(trailerId, page);
    console.log(comments);
    if (!comments) {
      return reject(transComment.comments_get_failed);
    }
    resolve(comments);
  });
};

module.exports = {
  createComment: createComment,
  getComments: getComments
};
