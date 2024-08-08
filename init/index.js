const mongoose= require("mongoose");
const url='mongodb://127.0.0.1:27017/wonderlust';
const listing = require("../models/listing.js");
const initdata= require("./data.js");


main().then((res)=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})



async function main(){
    await mongoose.connect(url);

};

const initDb= async()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"65d822b7f349f2902c361c91"}))
    await listing.insertMany(initdata.data);
    console.log("data was saved");
}


initDb();