const User=require("../models/user.js");
const nodemailer=require("nodemailer");



module.exports.signupform=(req,res)=>{
    res.render("./user/user.ejs");
}

module.exports.signup=async(req,res,next)=>{
    try{
    let{Email,password,username}=req.body;
    let newUser= new User({
        Email,username

    });
    let regiesterUser=await User.register(newUser,password);
    
    req.login( regiesterUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Welcome to Wonderlust");
    res.redirect("/listing");
        
    })
    
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");

}

    
}

module.exports.loginform=(req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome to wonderlust");
    let saveUrl=res.locals.redirectUrl||"/listing" ;   
    res.redirect(saveUrl) ;   
    
    }

module.exports.logout=  (req,res,next)=>{

    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","logout successfully");
        res.redirect("/listing");
    })

} 
module.exports.forgetform=(req,res)=>{
    res.render("./user/forget.ejs");
} 
module.exports.forget=(req,res)=>{
    res.send("mail send");
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'donnell.kovacek@ethereal.email',
            pass: 'UdDkJgxsHz5a1QFEr1'
        }
    });
    
}