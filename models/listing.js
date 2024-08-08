const mongoose= require("mongoose");

const Schema = mongoose.Schema;
const review=require("./review.js");



const listingSchema=new Schema({
    tittle:{
        type:String,
        required:true,

    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    image:{
        url:String,
        filename:String,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
    }
})


const listing=mongoose.model("listing",listingSchema);


module.exports= listing;





