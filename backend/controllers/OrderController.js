const Errorhandler = require('../utiles/errorHandling');
const asyncerror = require('../middlewares/asyncerror');
const Order = require('../models/orderModel')
const product = require('../models/productsModel')

//Create Order -- /api/v1/order/new
exports.newOrder = asyncerror(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        User:req.user.id
    })
    res.status(200).json({
        success:true,
        order  
    })
})

//Get Single Order -- /api/v1/order/677014e37ab19bc6cdb0cddb
exports.getsingleOrder = asyncerror(async(req,res,next)=>{
   const singleorder = await Order.findById(req.params.id).populate('User','name Email');
   console.log(singleorder)

    res.status(200).json({
    success:true,
    singleorder
   })
   
   if(!singleorder){
    return next(new Errorhandler(`Order not found with this ${req.params.id}`),400);
 }
})

//Get Loggedin User Orders -- /api/v1/myorders
exports.myorder = asyncerror(async(req,res,next)=>{
    const myorder = await Order.find({User:req.user.id});
 
     res.status(200).json({
     success:true,
     myorder
    })
 })

//Admin :get all order -- /api/v1/orders
exports.orders=(asyncerror(async(req,res,next)=>{
    const orders = await Order.find();
    
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
     res.status(200).json({
     success:true,
     totalAmount,
     orders
    })
}))

//Admin:update order (order status,deliveredAt status and product stock decrement)
//-- /api/v1/orders/677004da63a5117985aaa31f
exports.updateOrder = asyncerror(async(req,res,next)=>{
    const updateorder = await Order.findById(req.params.id)

    if(updateorder.orderstatus == 'Delivered'){
        return next(new Errorhandler('Order has been already Delivered!'));
    }

    updateorder.orderItems.forEach(async items=>{
        await updatestock(items.product,items.quantity)
    })
    updateorder.orderstatus=req.body.orderstatus;
    updateorder.deliveredAt = Date.now();
    await updateorder.save();

    res.status(200).json({
        success:true,
        updateorder
    })
})

async function updatestock(productid,quantity){
    const products = await product.findById(productid);
    products.stock = products.stock - quantity;
    products.save({validateBeforeSave:false})
}

//admin: Delete order -- /api/v1/orders/677004da63a5117985aaa31f
exports.deleteOrder = asyncerror(async(req,res,next)=>{
     const deleteorder = await Order.findById(req.params.id);
     if(!deleteorder){
        return next(new Errorhandler(`order not found with this id:${req.params.id}`));
     }
     await deleteorder.deleteOne() 
     res.status(200).json({
        success:true,
        message:"Order Has Been Deleted!"
     })
})