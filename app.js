require('dotenv').config();



const express= require("express");

const app=express();
const mongoose=require("mongoose");
const path=require("path");
const url='mongodb://127.0.0.1:27017/wonderlust';
const dbUrl=process.env.MONGOURL;

const methodOverride =require("method-override");
const ejsMate=require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");


const listings=require("./router/listing.js");
const reviews=require("./router/review.js");
const UserRouter=require("./router/user.js");
const Session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");


main().then((res)=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});



async function main(){
    await mongoose.connect(dbUrl);

};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,("/views")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,("/public"))));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret:process.env.SECRET, 
      },
      touchAfter: 24*3600  
});

const sessionoption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized :true,
    cookie:{
        expire:Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true,
    }
    
};

app.get("/",(req,res)=>{
    res.send("working");
})

app.use(Session(sessionoption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})







app.use("/listing",listings); 
app.use("/listing/:id/review",reviews);
app.use("/",UserRouter);








app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
});






app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{err});
   
   
});
app.listen(8080,(req,res)=>{
    console.log("server is listen");
    
});
