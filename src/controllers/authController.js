import { validationResult } from "express-validator/check";
import { auth } from "../services/index";
import UserModel from "../models/userModel";

let getLoginRegister = (req, res) => {
  return res.render("auth/master", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

//register for web
let postRegister = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    req.flash("errors", errorArr);
    return res.redirect("/login-register")
  }

  try {
    let createUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password, req.protocol, req.get("host"));
    successArr.push(createUserSuccess);
    req.flash("success", successArr);
    return res.redirect("/login-register");
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect("/login-register")
  }
};

//register for api
let postApiRegister = async (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArr.push(item.msg);
    });
    return res.sendByForm(401, errorArr, null);
  }

  try {
    let createUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password, req.protocol, req.get("host"));
    return res.sendByForm(200, "Create account success", createUserSuccess);

  } catch (error) {
    return res.sendByForm(401, error, null);
  }
};

let postLogin = async (req, res) => {
  try {
    let password = req.body.password;
    let email = req.body.email;
    let user = await UserModel.findByEmail(email);
    console.log(user);
    if (!user) {
      return res.sendByForm(401, "Authentication failed. User not found.", null);
    }
    if (!user.local.isActive) {
      return res.sendByForm(401, "Authentication failed. User not active.", null);
    }

    let checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.sendByForm(401, "Authentication failed. Password failed.", null);
    }
    return res.sendByForm(200, "Login successfully", user);

  } catch (error) {
    console.log(error);
    return res.sendByForm(401, "Authentication failed. Password failed.", null);
  }
}

let verifyAccount = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  try {
    let verifyUserSuccess = await auth.verifyAccount(req.params.token);
    successArr.push(verifyUserSuccess);
    req.flash("success", successArr);
    return res.redirect("/login-register");
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect("/login-register")
  }
}

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister,
  postApiRegister: postApiRegister,
  verifyAccount: verifyAccount,
  postLogin: postLogin
};
