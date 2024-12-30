const products = require('../data/pack.json');
const product = require('../models/productsModel');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

dotenv.config({path:'backend/config/config.env'});
connectDB();

const seeder = async ()=>{
    try{
        await product.deleteMany();
        console.log("product deleted!");
        await product.insertMany(products);
        console.log("All product added!");
        
    }catch{
        (error)=>{
            console.log(error.message);
        }
    }
    process.exit();
}
seeder();