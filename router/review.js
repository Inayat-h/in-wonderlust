const express = require("express");

const Router=express.Router({mergeParams:true});
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const review=require("../models/review.js");
const listing = require("../models/listing.js");
const {islogin,isauthor,validatereview}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");








Router.post("/", validatereview,islogin,wrapAsync(reviewcontroller.createreview));
Router.delete("/:reviewId/delete",islogin,isauthor,
wrapAsync(reviewcontroller.destroyreview));

module.exports=Router;