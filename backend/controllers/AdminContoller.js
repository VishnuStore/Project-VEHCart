const user = require('../models/UserModel');
const Errorhandler = require('../utiles/errorHandling');
const asyncerror = require('../middlewares/asyncerror');

//Admin: get all users -- /api/v1/admin/User
exports.GetallUser = asyncerror(async(req,res,next)=>{
    const users = await user.find();
    res.status(200).json({
        success : true,
        users
    })
})
//Admin: Single User-- /api/v1/admin/User/676990c2ec94315097ed57fd
exports.singleUser = asyncerror(async(req,res,next)=>{
    const singleuser = await user.findById(req.params.id)
    if(!singleuser){
        next(new Errorhandler(`User is not Found ${req.params.id}`))
    }
    res.status(200).json({
        success : true,
        singleuser
    })
})

//Admin: Update User
exports.updateUser = asyncerror(async(req,res,next)=>{
    const updateuser = {
        name:req.body.name,
        Email:req.body.Email,
        role:req.body.role
    }
    const profile = await user.findByIdAndUpdate(req.params.id,updateuser,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        profile
    })
})

//Admin: delete User
exports.DeleteUser = asyncerror(async(req,res,next)=>{
    const deleteuser = user.findById(req.params.id);
    if(!deleteuser){
        next(new Errorhandler('User is not Found `${req.params.id}`'));
    }
    await deleteuser.deleteOne();
    res.status(200).json({
        success:true,
    })
})