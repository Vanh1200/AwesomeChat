import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSesion from "./config/session";
import passport from "passport";
import configBaseResponse from "./base/baseResponse";

// Init app 
let app = express();

// Connect to MongoDb
ConnectDB();
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://movieadmin:movieadmin12@ds331558.mlab.com:31558/heroku_9pd987j2', {useNewUrlParser: true});

// Config session
configSesion(app);

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable flash message
app.use(connectFlash());

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Inject custom function
configBaseResponse();

// Init routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server listening at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});
