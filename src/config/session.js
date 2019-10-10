import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

/**
 * This variable is where save session, in this case is mongodb
 */
let sessionStore = new MongoStore({
  // url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  url: 'mongodb://movieadmin:movieadmin12@ds331558.mlab.com:31558/heroku_9pd987j2',
  autoReconnect: true,
  // autoRemove: "native" default 
})

/**
 * Config session for app
 * @param app from exactly express module
 */
let configSession = (app) => {
  app.use(session({
    key: "express.sid",
    secret: "mySecret",
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400 seconds = 1 day
    }
  }));
};

module.exports = configSession;
