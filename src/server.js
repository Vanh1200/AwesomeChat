import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSesion from "./config/session";
import passport from "passport";

// Init app 
let app = express();

// Connect to MongoDb
ConnectDB();

// Config session
// configSesion(app);
const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://moviedictionary:moviedic12@moviecluster-mspup.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Enable flash message
app.use(connectFlash());

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Init routes
initRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at ${process.env.PORT}/`);
});
