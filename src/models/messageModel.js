import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  sender: {
    _id: mongoose.Types.ObjectId,
    username: String,
    gender: { type: String, default: "male" },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    avatar: { type: String, default: "https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-0/c98.0.395.395a/p526x395/18839390_744391739075728_931962055289001288_n.jpg?_nc_cat=103&_nc_oc=AQmMsfC6bmnJv6vM8O0sbDGEzAMRhtpUUGXTjWvAHKwjYILmFzhswxv2wi6ss1jaq6k&_nc_ht=scontent.fhan3-2.fna&oh=de3fb78d5b33cfef80ce77ad9a5ee277&oe=5E30AE2F" },
    role: { type: String, default: "user" },
    local: {
      email: { type: String, trim: true },
      password: String,
      isActive: { type: Boolean, default: false },
      verifyToken: { type: String }
    },
    facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true }
    },
    google: {
      uid: String,
      token: String,
      email: { type: String, trim: true }
    },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null }
  },
  receiver: {
    _id: mongoose.Types.ObjectId,
    username: String,
    gender: { type: String, default: "male" },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    avatar: { type: String, default: "https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-0/c98.0.395.395a/p526x395/18839390_744391739075728_931962055289001288_n.jpg?_nc_cat=103&_nc_oc=AQmMsfC6bmnJv6vM8O0sbDGEzAMRhtpUUGXTjWvAHKwjYILmFzhswxv2wi6ss1jaq6k&_nc_ht=scontent.fhan3-2.fna&oh=de3fb78d5b33cfef80ce77ad9a5ee277&oe=5E30AE2F" },
    role: { type: String, default: "user" },
    local: {
      email: { type: String, trim: true },
      password: String,
      isActive: { type: Boolean, default: false },
      verifyToken: { type: String }
    },
    facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true }
    },
    google: {
      uid: String,
      token: String,
      email: { type: String, trim: true }
    },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null }
  },
  text: String,
  type: Number,
  // file: { data: Buffer, contentType: String, fileName: String },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

MessageSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  removeById(id) {
    return this.findByIdAndRemove(id);
  },

  getMessages(firstUserId, secondUserId, page) {
    let offset = 0;
    if(!page) page = 0;
    else offset = page * 20;
    return this.find({
      $or: [
        {
          $and: [
            {"sender._id": firstUserId},
            {"receiver._id": secondUserId}
          ]
        },
        {
          $and: [
            {"sender._id": secondUserId},
            {"receiver._id": firstUserId}
          ]
        }
      ]
    } , null, {skip: offset, limit: 20}).sort({createdAt: -1});
  }
};

module.exports = mongoose.model("message", MessageSchema);
