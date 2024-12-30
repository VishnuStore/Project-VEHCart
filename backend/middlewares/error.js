const Errorhandler = require("../utiles/errorHandling");

module.exports  = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    if(process.env.NODE_ENV=="development"){
        res.status(err.statuscode).json({
            success:false,
            message:err.message,
            stack:err.stack,
            error:err
        })
    }
    if(process.env.NODE_ENV=="production"){
        let message = err.message;
        let error = new Errorhandler(message);
        if(err.name == "ValidationError"){
            message = Object.values(err.errors).map(value=> value.message)
            error = new Errorhandler(message)
            err.statuscode = 400
        }
        if(err.name == "CastError"){
            message = `Resource Not Found : ${err.path}`;
            error = new Errorhandler(message);
        }
        res.status(err.statuscode).json({
            success:false,
            message:error.message || "Internal server Error"
        })
    }
}