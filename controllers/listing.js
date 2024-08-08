const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken:'pk.eyJ1IjoiaW5heWF0MDYiLCJhIjoiY2x6NDcwbHZ3M2U2eTJqc2dtdDU5ZDNnMiJ9.4U9BOVpeR0PNj1LtFVmo4A'  });


module.exports.new=(req,res)=>{
    
    res.render("./listing/new.ejs");
};

module.exports.createlisting=async(req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2
      })
        .send();
        
        
      let url=req.file.path;
      let filename=req.file.filename;


   
    const newlisting=new listing(req.body.listing);
       newlisting.owner=req.user._id;
       newlisting.image={url,filename};
       newlisting.geometry=response.body.features[0].geometry
       
        await newlisting.save();
        console.log(newlisting);
        req.flash("success","new listing created");
        res.redirect("/listing");     
    
    
    };

module.exports.showlisting=  async(req,res)=>{
    let {id}=req.params;
    const Listing = await listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    if(!Listing){
        req.flash("error","listing not found");
        res.redirect("/listing");
    }
    res.render("./listing/show.ejs",{Listing});


}; 

module.exports.editform=async(req,res)=>{
    let {id}=req.params;
    const Listing = await listing.findById(id);
    
    res.render("./listing/edit.ejs",{Listing});


};

module.exports.index=async(req,res)=>{
    const allListings=await listing.find({});
    res.render("./listing/read.ejs",{allListings});
};


module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    

     const newlisting=await listing.findByIdAndUpdate(id,{...req.body.listing});
     if(typeof req.file!="undefined"){
     let url=req.file.path;
     let filename=req.file.filename;
     newlisting.image={url,filename};
     await newlisting.save()};

    
    res.redirect(`/listing/${id}`);


};

module.exports.destroylisting=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted succesfully");
   
    res.redirect(`/listing`);


};