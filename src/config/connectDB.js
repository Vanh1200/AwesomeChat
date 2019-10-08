import mongoose from "mongoose";
import bluebird from "bluebird";

/** 
 * Connect to MongoDB
*/


let connectDB = () => {
  mongoose.Promise = bluebird;

  // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  let URI = `mongodb+srv://moviedictionary:<password>@moviecluster-mspup.mongodb.net/admin?retryWrites=true&w=majority`;

  return mongoose.connect(URI,
    {
      useNewUrlParser: true
    }).catch(error => console.log(error));
  ;
};

module.exports = connectDB;
