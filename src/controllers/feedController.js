import { feed } from "../services/index";

let postFeed = async (req, res) => {
  try {
    let userId = req.params.userId;
    let cardType = req.body.cardType;
    let text = req.body.text;
    let trailerId = req.body.trailerId;
    let imageUrl = req.body.imageUrl;
    let baseFeed = {
      userId: userId,
      cardType: cardType,
      text: text,
      trailerId: trailerId,
      imageUrl: imageUrl,
    }
    console.log(baseFeed);
    let feedCreated = await feed.createFeed(baseFeed);
    if (feedCreated == null) {
      return res.sendByForm(401, "Can not create post", null);
    }
    return res.sendByForm(200, "Create post success", feedCreated);

  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not create post", null);
  }
};

let getFeeds = async (req, res) => {
  try {
    let page = req.query.page;
    let userId = req.params.userId;
    let feeds = await feed.getFeeds(userId, page);
    return res.sendByForm(200, "Get post success", feeds);
  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not get post", null);
  }
}

let getFeedsProfile = async (req, res) => {
  try {
    let page = req.query.page;
    let userId = req.params.userId;
    let feeds = await feed.getFeedsProfile(userId, page);
    return res.sendByForm(200, "Get post success", feeds);
  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Can not get post", null);
  }
}

module.exports = {
  postFeed: postFeed,
  getFeedsProfile: getFeedsProfile,
  getFeeds: getFeeds
};