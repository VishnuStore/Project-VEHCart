const Product = require('../models/productsModel');
const Errorhandler = require('../utiles/errorHandling');
const asyncerror= require('../middlewares/asyncerror');
const searchkeyword = require('../utiles/apifeatures'); 
const { promise } = require('bcrypt/promises');
//getproduct - /api/v1/products GET()
exports.getproduct = asyncerror(
  async (req,res,next)=>{
    const perpage =  2;
    const apifeatures = new searchkeyword(Product.find(),req.query).search()
                                                                   .filter()
                                                                   .paginate(perpage)
    const products = await apifeatures.query;
    await new Promise(resolve=>{setTimeout(resolve,5000)})
      res.status(200).json({
          success:true,
          perpage,
          products
      })
  }
)
//getsingleproduct - /api/v1/product/674de2ecb5599bc02fd39faf Get()
exports.singleProduct = asyncerror(async (req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(new Errorhandler("Product Not Found",400));
  }
  res.status(201).json({
    success:"true",
    product
  })
});

//createproduct - /api/v1/product/new POST()
exports.newProduct = asyncerror( async (req,res,next)=>{
  req.body.user = req.user.id
  const productnew = await Product.create(req.body)
  res.status(201).json({
    success:true,
    productnew
  })
});

//upadteproduct - /api/v1/product/674de2ecb5599bc02fd39faf
//body - raw - updatedata PUT()
exports.updateProduct = asyncerror(async (req,res,next)=>{
  const products = await Product.findById(req.params.id);
  await Product.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
  })
  if(!products){
    return next(new Errorhandler("Product Not Found",400));
  }
  res.status(200).json({
    success:true,
    products
  })
});

//Deleteproduct - /api/v1/product/674de2ecb5599bc02fd39fb2 Delete()
exports.deleteProduct = asyncerror(async (req,res,next)=>{
  const product = await Product.findById(req.params.id)
  if(!product){
    return next(new Errorhandler("Product Not Found",400));
  }
  await product.deleteOne();
  res.status(200).json({
    success:true,
    message:"product Deleted"
  })
});

//create Reviews - 
exports.CreateReview = asyncerror(async(req,res,next)=>{
   const {productid,rating,comment} = req.body;
   const reviews = {
    user:req.user.id,
    rating,
    comment
   }
   const product = await Product.findById(productid);
   const isreviwed = product.reviews.find(user =>{
      return user.user.toString() == req.user.id.toString()
   });
   if(isreviwed){
    //User update the reviews
      product.reviews.forEach(review =>{
        if( review.user.toString() == req.user.id.toString()){
          review.comment = comment
          review.rating = rating
        }
      })
   }
   else{
    //creating the review
    product.reviews.push(reviews);
    product.numOfReviews = product.reviews.length;
   }
   //find the average of the product reviews
   product.ratings = product.reviews.reduce((acc ,review)=>{
    return acc + review.rating ;
   },0)/product.reviews.length
   product.ratings =  isNaN(product.ratings)?0:product.ratings

   await product.save({validateBeforeSave:false})

   res.status(200).json({
    success:true
   })

})

// get Reviews 
exports.getReviews = asyncerror(async(req,res,next)=>{
  const getReviews = await Product.findById(req.query.id);
  res.status(200).json({
    success:true,
    Reviews:getReviews.reviews
  })
})

//Delete Review 
exports.deleteReview = asyncerror(async(req,res,next)=>{
  const deleteReview = await Product.findById(req.query.productid);
  //filtering the reviews which is does match the deleting review id 
  const reviews = deleteReview.reviews.filter(review =>{
   return review._id.toString() !== req.query. id.toString();
  })
  //number of reviews update
  const numOfReviews = reviews.length;
  //find the average with the filter reviews
  let ratings = reviews.reduce((acc ,review)=>{
    return acc + review.rating ;
   },0)/reviews.length
   ratings = isNaN(ratings)?0:ratings
  //save the product document
  await Product.findByIdAndUpdate(req.query.productid,{
    reviews,
    numOfReviews,
    ratings
  })
  res.status(200).json({
    success:true
  })
})