const Product = require('../models/productsModel');
const Errorhandler = require('../utiles/errorHandling');
const asyncerror= require('../middlewares/asyncerror');
const searchkeyword = require('../utiles/apifeatures') 
//getproduct - /api/v1/products GET()
exports.getproduct = asyncerror(
  async (req,res,next)=>{
    const perpage =  2;
    const apifeatures = new searchkeyword(Product.find(),req.query).search()
                                                                   .filter()
                                                                   
    const products = await apifeatures.query;
      res.status(200).json({
          success:true,
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
