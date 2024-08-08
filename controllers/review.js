const review=require("../models/review.js");
const listing = require("../models/listing.js");



module.exports.createreview=async(req,res)=>{
    let Listing= await listing.findById(req.params.id);
    let newReview=new review(req.body.review);
     newReview.author= req.user._id;
     
    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();
    req.flash("success","new review created");
    res.redirect(`/listing/${Listing.id}`);

}

module.exports.destroyreview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");
    res.redirect(`/listing/${id}`);


};