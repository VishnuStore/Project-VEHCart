const asyncerror = require("../middlewares/asyncerror");
const user = require('../models/UserModel');
const Errorhandler = require('../utiles/errorHandling');
//get user profile -- /api/v1/myprofile
exports.GetUserProfile = asyncerror(async(req,res,next)=>{
    const profile = await  user.findById(req.user.id);
    res.status(200).json({
     success:true,
     profile
    })
 })
 
 //change password -- /api/v1/password/change
 exports.changePassword = asyncerror(async(req,res,next)=>{
     const Changepass = await  user.findById(req.user.id).select('+password');
     if(! await Changepass.Password(req.body.Oldpassword)){
         return next(new Errorhandler('Oldpassword is incorrect',404));
     }
     //assign new password
     Changepass.password = req.body.password;
     await Changepass.save({validateBeforeSave:false});
     res.status(200).json({
         success:true
     })
 })
 
 //Update Profile --
 exports.UpdateProfile = asyncerror(async(req,res,next)=>{
     const changeprofile = {
         name:req.body.name,
         Email:req.body.Email
     }
     const profile = await user.findByIdAndUpdate(req.user.id,changeprofile,{
         new:true,
         runValidators:true
     })
     res.status(200).json({
         success:true,
         profile
     })
 
 })