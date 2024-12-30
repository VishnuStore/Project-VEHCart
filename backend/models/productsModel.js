const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[ true,"Please enter the product name"],
        trim: true
    },
    price:{
        type: Number,
        default:0.0
    },
    description:{
        type: String,
        required:[ true,"Please enter the product description"],
    },
    ratings:{
        type: String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required:true,
        enum:{
            values:[
                "Laptops",
                "Mobile Phones",
                "Accessories",
                "Headphones",
                "Sports"
            ],
            message:"please select correct category"
        }
    },
    seller: {
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    numOfReviews:{
        type:String,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
})

let schema = mongoose.model('Product',productSchema)
module.exports = schema;