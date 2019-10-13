import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  userId: String,
  trailerId: String,
  userName: String,
  userAvatarUrl: {type: String, default: "https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-0/c98.0.395.395a/p526x395/18839390_744391739075728_931962055289001288_n.jpg?_nc_cat=103&_nc_oc=AQmMsfC6bmnJv6vM8O0sbDGEzAMRhtpUUGXTjWvAHKwjYILmFzhswxv2wi6ss1jaq6k&_nc_ht=scontent.fhan3-2.fna&oh=de3fb78d5b33cfef80ce77ad9a5ee277&oe=5E30AE2F" },
  content: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

CommentSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  removeById(id) {
    return this.findByIdAndRemove(id);
  },

  /**
   * get limited message by trailer id
   * @param {string} trailerId 
   * @param {number} limit 
   * @param {number} offset
   */
  getCommentsByTrailerId(trailerId, offset, limit) {
    return this.find({ "trailerId": trailerId}, null, {skip: offset, limit: limit});
  }
};

module.exports = mongoose.model("comment", CommentSchema);