import express from "express";
import {home,auth,comment} from "../controllers/index";
import {authValid} from "../validation/index";
import initPassportLocal from "../controllers/passportController/local";
import passport from "passport";

// Init all passport
initPassportLocal();

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) => {
  router.get("/", home.getHome);
  router.get("/login-register", auth.getLoginRegister);
  router.post("/register", authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount);
  router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-register",
    successFlash: true,
    failureFlash: true
  }))

  //API for clients
  router.post("/api/login", auth.postLogin);
  router.post("api/comment/")
  router.get("api/comment/:trailerid", comment.getComments);


  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  return app.use("/", router);
};

module.exports = initRoutes;
