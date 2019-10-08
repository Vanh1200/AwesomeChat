import { validationResult } from "express-validator/check";
import { auth } from "../services/index";
import UserModel from "../models/userModel";

let getLoginRegister = (req, res) => {
  return res.render("auth/master", {
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

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

let postLogin = async (req, res) => {
  try {
    let password = req.body.password;
    let email = req.body.email;
    let user = await UserModel.findByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    }
    if (!user.local.isActive) {
      return res.status(401).send({ success: false, msg: 'Authentication failed. User not active.' });
    }

    let checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(401).send({ success: false, msg: 'Authentication failed. Password failed.' });
    }
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(401).send({ success: false, msg: 'Authentication failed. Password failed.' });
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
  verifyAccount: verifyAccount,
  postLogin: postLogin
};
