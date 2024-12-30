const { reset } = require('nodemon');
const asyncerror = require('../middlewares/asyncerror');
const user = require('../models/UserModel');
const SendEmail = require('../utiles/Email');
const Errorhandler = require('../utiles/errorHandling');
const crypto = require('crypto')
//Register Apl call ---- /api/v1/register
exports.registerUser = asyncerror(async(req,res,next)=>{
    const {name,Email,password,avatar}= req.body
    const User = await user.create({
        name,
        Email,
        password,
        avatar
    })

    const token = User.GetVEHToken(); 

    res.status(201).json({
        success:true,
        User,
        token
    })
}) 
//Login APl call ---- /api/v1/login
exports.userLogin = asyncerror(async(req,res,next)=>{
    const {Email,password}= req.body;
    if(!Email||!password){
       return next(new Errorhandler('please enter the Email and Password'));
    }
    const login= await user.findOne({Email}).select('+password')
    if(!login){
        return next(new Errorhandler('Invaild Your Email and password'));
    }

    if(!await login.Password(password)){
        return next(new Errorhandler('Invaild Your Email and password'));
    }

    const token = login.GetVEHToken(); 

    const cookies = {
             expires:new Date(  Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
            ,
             httpOnly:true
            }
    res.status(201)
    .cookie('token',token,cookies)
    .json({
        success:true,
        login,
        token
    })
    

})
//UserLogout -- /api/v1/logout
exports.userLogout = asyncerror((req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }).status(200)
    .json({
        success:true,
        message:'Logged Out'
    })
})

//forgetPassword --/api/v1/password/forget
exports.ForgetPassword=asyncerror(async(req,res,next)=>{
  const mail =await user.findOne({Email:req.body.Email});
  if(!mail){
    return next(new Errorhandler('User not found this Email'),404);
  }
  const gettoken = mail.ResetPassword();
  console.log(gettoken)
  await mail.save({validateBeforeSave:false});

  //create url
  const url = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${gettoken}`;
  console.log(url)

  const message = `your password reset Url is as follows \n\n
  ${url}\n\n If your not request this email, then ignore it..`
  try{
    SendEmail({
        Email:mail.Email,
        subject:"VEHCart Password Recoverey",
        message
    })
    res.status(200).json({
        success:true,
        message:`Email Send to ${mail.Email}`
    })
  }catch(error){
    user.resetpasswordToken = undefined;
    user.resetpasswordTokenExpire = undefined;
    await mail.save({validateBeforeSave:false});
    return next(new Errorhandler(error.message),500);
  }
})

//resetPassword -- /api/v1/password/forget/api/v1/password/forget/api/v1/password/forget
exports.resetPassword =asyncerror(async(req,res,next)=>{
  const resetpasswordToken =  crypto.createHash('sha256').update( req.params.token).digest('hex');
  const password = await user.findOne({
    resetpasswordToken,
    resetpasswordTokenExpire:{
        $gt : Date.now()
    }
    })
  if(!password){
   return next(new Errorhandler("password reset Token is invalid and expires"));
  }
  if(req.body.password !== req.body.confirmpassword){
   return next(new Errorhandler("Password is not Match"));
  }
  password.password = req.body.password;

  password.resetpasswordToken = undefined;
  password.resetpasswordTokenExpire = undefined;
  await password.save({validateBeforeSave:false});
  
  const token = password.GetVEHToken(); 

  const cookies = {
        expires:new Date(  Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
        res.status(201)
        .cookie('token',token,cookies)
        .json({
        success:true,
        password,
        token
        })
})

