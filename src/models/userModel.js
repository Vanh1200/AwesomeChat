import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
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
});

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  findByEmail(email) {
    return this.findOne({ "local.email": email }).exec();
  },

  removeById(id) {
    return this.findByIdAndRemove(id).exec();
  },

  verify(token) {
    return this.findOneAndUpdate(
      { "local.verifyToken": token },
      { "local.verifyToken": null, "local.isActive": true }
    ).exec();
  },

  findByToken(token) {
    return this.findOne({ "local.verifyToken": token}).exec();
  },

  findUserById(id) {
    return this.findById(id).exec();
  },

};

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password); // return promise(boolean)
  }
}

module.exports = mongoose.model("user", UserSchema);
