const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const TOKEN = require('jsonwebtoken'); 
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[ true,"Please enter the Name"],
    },
    Email:{
        type: String,
        required:[true,"please enter the Email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email address"]
    },
    password:{
        type: String,
        required:[ true,"Please enter the password"],
        maxlength:[8,"please enter the password only 8 digits"],
        select : false
    },
    avatar:{
        type: String,
        required:true
    },
    role:{
        type:String,
        default:"User"
    },
    resetpasswordToken:String,
    resetpasswordTokenExpire:Date,
    createAt:{
        type:Date,
        default:Date.now()
    }  
})
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,8)
})

UserSchema.methods.GetVEHToken = function(){
    return TOKEN.sign({id :this.id},process.env.VEH_SECRET,
        {
            expiresIn:process.env.VEH_EXPIRES_TIME
        }
    )
} 

UserSchema.methods.Password = async function(password){
    return  bcrypt.compare(password,this.password)
}

UserSchema.methods.ResetPassword = function(){
   //generate Token
   const token = crypto.randomBytes(20).toString('hex');

   //save the usermodel in resetpasswordToken 
   this.resetpasswordToken = crypto.createHash('sha256').update(token).digest('hex');

   //save the usermodel in resetpasswordTokenExpire
   this.resetpasswordTokenExpire = Date.now()+30 * 60 * 1000;

   return token
}

let schema = mongoose.model('User',UserSchema)
module.exports = schema;