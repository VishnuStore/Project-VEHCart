const Errorhandler = require("../utiles/errorHandling");
const asyncerror = require("./asyncerror");
const VEH = require('jsonwebtoken');
const user = require('../models/UserModel')

exports.AuthenticateUser = asyncerror(async(req,res,next)=>{
   const {token} = req.cookies;

   if(!token){
     return next(new Errorhandler('Login first to handle the resource'));
   }

   const tokenid =  VEH.verify(token,process.env.VEH_SECRET);
   req.user = await user.findById(tokenid.id);
   next();
})

exports.authorizeRole = (...roles)=>{
   return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role ${req.user.role} is not allowed`,401));
        }    
        next();
    }
}