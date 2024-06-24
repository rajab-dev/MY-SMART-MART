const productModel = require("../models/product.model")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const orderModel = require("../models/order.model")

exports.newOrder = catchAsyncErrors( async(req, res, next) => {
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,} = req.body

    // console.log("order to be stored",paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice)

    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      PaidAt:Date.now(),
      user:req.user.id,
    })

    res.status(201).json({
      success:true,
      order,
    })
})

// get single order
exports.getSingleOrder = catchAsyncErrors( async(req,res,next) => {
    const order = await orderModel.findById(req.params.id).populate("user","name email")

    if(!order){
      next(new ErrorHandler("oder not found",404))
    }

    res.status(200).json({
      success:true,
      order
    })
})

// get loggedIn user orders
exports.myOrders = catchAsyncErrors( async(req, res, next) => {
  const orders = await orderModel.find({user:req.user.id})

  if(!orders){
    next(new ErrorHandler("oders not found",404))
  }

  res.status(200).json({
    success:true,
    orders
  })
})


// get all orders --Admin

exports.getAllOrders = catchAsyncErrors( async(req, res, next) => {

  const orders = await orderModel.find().populate("user","name email")

  if(!orders){
    next(new ErrorHandler("oders not found",404))
  }

  let totalAmount = 0;

  
  orders.forEach(order =>{
    totalAmount+=order.totalPrice
  })

  res.status(200).json({
    success:true,
    totalAmount,
    orders
  })
})


// update order status --Admin

exports.updateOrder = catchAsyncErrors( async (req, res, next) => {

  const order = await orderModel.findById(req.params.id)

  if(!order){
    next(new ErrorHandler("oders not found",404))
  }

  if(order.orderStatus==="Delivered"){
    next(new ErrorHandler("you have already delivered this order",404))
  }

if(req.body.status==="Shipped"){
  order.orderItems.forEach(async(order) => {
    await updateStock(order.product,order.quantity)
  })
}

  order.orderStatus=req.body.status

  if(order.orderStatus==="Delivered"){
      order.deliveredAt=Date.now()
  }


   await order.save({validateBeforeSave:false})


  res.status(200).json({
    success:true,
  })
})


async function updateStock (id, quantity){
     const product = await productModel.findById(id)
     product.stock-=quantity
     await product.save({validateBeforeSave:false})  
}

// delete order --Admin
exports.deleteOrder = catchAsyncErrors( async(req,res,next) => {
  const order = await orderModel.findById(req.params.id)

  if(!order){
    next(new ErrorHandler("oders not found",404))
  }

   await orderModel.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success:true,
  })
})


