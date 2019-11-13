import { user } from "../services/index";

let searchUser = async (req, res) => {
  try {
    let page = req.query.page;
    let userId = req.params.userId;
    let query = req.query.q;
    let users = await user.searchUser(userId, page, query);
    return res.sendByForm(200, "Search users success", users);
  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not search users", null);
  }
}

module.exports = {
  searchUser: searchUser,
};