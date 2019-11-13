import FeedModel from "./../models/feedModel";
import UserModel from "./../models/userModel";

let createFeed = (baseFeed) => {
  return new Promise(async (resolve, reject) => {
    
    let user = await UserModel.findUserById(baseFeed.userId);

    if (!user) {
      return reject("không tìm thấy user");
    }
    let feedModel = {
      user: user,
      text: baseFeed.text,
      trailerId: baseFeed.trailerId,
      imageUrl: baseFeed.imageUrl,
      cardType: baseFeed.cardType
    }
    let feed = await FeedModel.createNew(feedModel);
    console.log(feed);
    if(!feed) {
      return reject("Không tạo được post");
    }
    resolve(feed);
  });
};

let getFeeds = (userId, page) => {
  return new Promise(async (resolve, reject) => {
    let feeds = await FeedModel.getFeeds(userId, page);
    console.log(feeds);
    if (!feeds) {
      return reject("Không lấy được bài đăng nào");
    }
    resolve(feeds);
  });
};

let getFeedsProfile = (userId, page) => {
  return new Promise(async (resolve, reject) => {
    let feeds = await FeedModel.getFeedsProfile(userId, page);
    console.log(feeds);
    if (!feeds) {
      return reject("Không lấy được bài đăng nào");
    }
    resolve(feeds);
  });
};

module.exports = {
  createFeed: createFeed,
  getFeeds: getFeeds,
  getFeedsProfile: getFeedsProfile
};
