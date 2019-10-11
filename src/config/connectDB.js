import mongoose from "mongoose";
import bluebird from "bluebird";

/** 
 * Connect to MongoDB
*/


let connectDB = () => {
  mongoose.Promise = bluebird;

  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  // let URI = "mongodb://movieadmin:movieadmin12@ds331558.mlab.com:31558/heroku_9pd987j2";

  return mongoose.connect(URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  ;
};

module.exports = connectDB;
