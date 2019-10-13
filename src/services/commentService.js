import CommentModel from "./../models/commentModel";
import {transComment} from "../../lang/vi";

let createComment = (trailerId, userId, userName, userAvatarUrl, content) => {
  return new Promise(async (resolve, reject) => {
    let commentItem = {
      trailerId: trailerId,
      userId: userId,
      userName: userName,
      userAvatarUrl: userAvatarUrl,
      content: content
    }
    let comment = await CommentModel.createNew(commentItem);
    console.log(comment);
    if(!comment) {
      return reject(transComment.comment_not_created);
    }
    resolve(transComment.comment_created);
  });
};

let getComments = (trailerId, offset, limit) => {
  return new Promise(async (resolve, reject) => {
    let comments = await CommentModel.getCommentsByTrailerId(trailerId, offset, limit);
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


