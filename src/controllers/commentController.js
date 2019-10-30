import { comment } from "../services/index";

let postComment = async (req, res) => {
  try {
    let trailerId = req.params.trailerId;
    let userId = req.body.userId;
    let content = req.body.content;
    let commentCreated = await comment.createComment(trailerId, userId, content);
    if (commentCreated == null) {
      return res.sendByForm(401, "Can not create comment", null);
    }
    return res.sendByForm(200, "Create comment success", commentCreated);

  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not create comment", null);
  }
};

let getComments = async (req, res) => {
  try {
    let trailerId = req.params.trailerId;
    let page = req.query.page;
    console.log(trailerId);
    let comments = await comment.getComments(trailerId, parseInt(page));
    return res.sendByForm(200, "Get comments success", comments);
  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not get comments", null);
  }
}

module.exports = {
  postComment: postComment,
  getComments: getComments
};