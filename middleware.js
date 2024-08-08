const listing=require("./models/listing");
const review=require("./models/review");
const {listingSchema} =require("./Schema.js");
const {reviewSchema} =require("./Schema.js");
const ExpressError=require("./utils/ExpressError.js");


module.exports.islogin=(req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error","you must be logged in");
         return res.redirect("/login");
    }
    next();
}


module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();

}
module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
    let Listing= await listing.findById(id);
    if(!Listing.owner.equals(res.locals.currUser._id)){
        
      req.flash("error","yor are not the owner of this listing");
      return res.redirect(`/listing/${id}`);

    }
    next();

}


module.exports.isauthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let Review= await review.findById(reviewId);
    if(!Review.author.equals(res.locals.currUser._id)){
        
      req.flash("error","you are not the author of this review");
      return res.redirect(`/listing/${id}`);

    }
    next();

}

module.exports.validateListing=(req,res,next)=>{
    const re =listingSchema.validate(req.body);
    if(re.error){
     throw new ExpressError(404,re.error);
    }else{
        next();
    }
 
 }

 module.exports.validatereview = (req,res,next)=>{
    const re =reviewSchema.validate(req.body);
    if(re.error){
     throw new ExpressError(404,re.error);
    }else{
        next();
    }
 
 }

