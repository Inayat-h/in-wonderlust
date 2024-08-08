const express = require("express");

const Router=express.Router();
const wrapAsync =require("../utils/wrapAsync.js");


const {islogin,isowner,validateListing,}=require("../middleware.js");
const listingcontroller=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudinaryconfi.js");
const upload = multer({ storage });





Router.get("/new",islogin,listingcontroller.new);

Router.route("/")
.post(
upload.single("listing[image]"),    
validateListing,wrapAsync(listingcontroller.createlisting))
.get(wrapAsync(listingcontroller.index))



Router.route("/:id")
.get(wrapAsync(listingcontroller.showlisting))
.put(islogin,isowner,upload.single("listing[image]"),validateListing, wrapAsync(listingcontroller.updatelisting));

 
Router.get("/:id/edit",islogin,isowner,wrapAsync(listingcontroller.editform));


Router.delete("/:id/delete",islogin, wrapAsync(listingcontroller.destroylisting));
module.exports=Router;