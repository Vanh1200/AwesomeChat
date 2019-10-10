import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  userId: String,
  trailerId: String,
  userName: String,
  userAvatarUrl: String,
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
    return this.find({ "trailerId": trailerId })
      .sort({ "createAt": -1 })
      .limit(limit)
      .offset(offset)
      .exect();
  }
};

module.exports = mongoose.model("comment", CommentSchema);