const express = require("express");

const Router=express.Router();
const User=require("../models/user.js");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");
const usercontroller=require("../controllers/user.js");


Router.route("/signup")
.get(usercontroller.signupform)
.post(usercontroller.signup);


Router.route("/login")
.get(usercontroller.loginform)
.post(saveredirectUrl,
passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
usercontroller.login
);
Router.route("/forget")
.get(usercontroller.forgetform)
.post(usercontroller.forget);



Router.get("/logout",usercontroller.logout);







module.exports=Router;