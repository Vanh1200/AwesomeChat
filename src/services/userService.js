import UserModel from "./../models/userModel";

let searchUser = (userId, page, query) => {
  return new Promise(async (resolve, reject) => {
    let users = await UserModel.findUserByKeyword(query, page);
    console.log(users);
    if (!users) {
      return reject("Can not find any user match");
    }
    resolve(users);
  });
};

module.exports = {
  searchUser: searchUser,
};
