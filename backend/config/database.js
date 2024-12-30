const monogoose = require('mongoose');
const connectDB = ()=>{
    monogoose.connect(process.env.DB_URI,{ 
        
    }).then(url=>{
        console.log(`MongoDB is Connected to the Host: ${url.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB;