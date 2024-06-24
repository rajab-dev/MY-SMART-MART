const productModel = require("../models/product.model")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const ApiFeatures = require("../utils/apiFeatures")
const cloudinary = require("cloudinary")

exports.createProduct = catchAsyncErrors( async  ( req, res ) => {

      let images=[];


      if(typeof req.body.images ==="string"){
             images.push(req.body.images);
      }else{
            images = req.body.images;
      }

      const imagesLink=[];

      for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i],{
                  folder:"products"
            })

            imagesLink.push({
               public_id:result.public_id,
               url:result.secure_url,   
            })
            
      }




    req.body.images=imagesLink;  
    req.body.user = req.user.id; 
    const product = await productModel.create(req.body)

    res.status(201).json({
      success:true,
      product
    })   
})

exports.getAllProducts = catchAsyncErrors( async ( req, res, next ) => {
      // return next(new ErrorHandler("product not found",404))


      const resultPerPage = 8; 
      const productsCount = await productModel.countDocuments();

      const apiFeature = new ApiFeatures(productModel.find(),req.query)
      .search().filter().pagination(resultPerPage)
      
      // let products = await apiFeature.query;
      // let filteredProductsCount = products.length
      
      // apiFeature.pagination(resultPerPage)

      const products = await apiFeature.query
      //   let filteredProductsCount = products.length
      
      // apiFeature.pagination(resultPerPage)

      // let products = await apiFeature.query;

      // let filteredProductsCount = products.length;
    
      // apiFeature.pagination(resultPerPage);
    
      // products = await apiFeature.query;

      res.status(200).json(
      { success:true,
        products,
        productsCount,
        resultPerPage, 
      //   filteredProductsCount,
       })
})




exports.getAdminProducts = catchAsyncErrors( async ( req, res, next ) => {

      const products = await productModel.find();

      res.status(200).json(
      { success:true,
        products,
       })
})



exports.updateProduct = catchAsyncErrors( async ( req, res, next ) => {
     let product = await productModel.findById(req.params.id)

     if(!product){
      return res.status(500).json({
            success:false,
      })
     }

     let images=[];


     if(typeof req.body.images ==="string"){
            images.push(req.body.images);
     }else{
           images = req.body.images;
     }

     if(images!==undefined){
      for (let i = 0; i < images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
      }
     }


     const imagesLink=[];

     for (let i = 0; i < images.length; i++) {
           const result = await cloudinary.v2.uploader.upload(images[i],{
                 folder:"products"
           })

           imagesLink.push({
              public_id:result.public_id,
              url:result.secure_url,   
           })
           
     }


     req.body.images=imagesLink;

     product = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

     res.status(201).json({
      success:true,
      product,
     })
})

exports.deleteProduct = catchAsyncErrors( async ( req,res, next ) => {
      let product = await productModel.findById(req.params.id)

      if(!product){
            return res.status(500).json({
                  success:false,
            })
           }


           for (let i = 0; i < product.images.length; i++) {
                    
                  const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)

            
           }



      product  = await productModel.findByIdAndDelete(req.params.id)   
      
      res.status(200).json({
            success:true,
      })
})

exports.getProductDetails = catchAsyncErrors( async (req,res,next) => {

      // return next(new ErrorHandler("product not found",404))
      
     const product = await productModel.findById(req.params.id)

     if(!product){
      return next(new ErrorHandler("product not found",404))
     }

     res.status(200).json({
      success:true,
      product
     })
})

// create and update review

exports.createProductReview = catchAsyncErrors( async(req,res,next)=>{
      const { rating, comment, productId } = req.body

      const review = {
          user:req.user.id,
          name:req.user.name,
          rating:Number(rating),
          comment,  
      }

      const product = await productModel.findById(productId)

      const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user.id)

      if(isReviewed){
          
          product.reviews.forEach(async(rev) => {
            
            if(rev.user.toString()===req.user.id){
                 rev.rating=Number(rating)
                 rev.comment=comment
            }

          });  
          


      }else{
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
      }

      let avg = 0;
      product.reviews.forEach(rev =>{
            avg+=rev.rating
            
      })

      product.ratings=avg/product.reviews.length;
      await product.save()


      res.status(200).json({
            success:true
      })
})


// get all reviews  of a product

exports.getAllReviews = catchAsyncErrors( async(req, res, next)=> {
      const product = await productModel.findById(req.query.id)
      
      if(!product){
       return next(new ErrorHandler("product not found",404))
      }
      res.status(200).json({
            success:true,
            reviews:product.reviews
      })
})



// delete a review of a product

exports.deleteReview = catchAsyncErrors( async(req, res, next)=> {
      const product = await productModel.findById(req.query.productId)
      
      if(!product){
       return next(new ErrorHandler("product not found",404))
      }

      const reviews = product.reviews.filter(rev => rev._id.toString()!==req.query.id.toString())

      let avg = 0;
      reviews.forEach(rev =>{
            avg+=rev.rating
            
      })

      let ratings=0;
      if(reviews.length===0){
            ratings=0
      }else{
          ratings=avg/reviews.length;     
      }
      const numOfReviews = reviews.length;
      
      await productModel.findByIdAndUpdate(req.query.productId,{
           reviews,
           ratings,
           numOfReviews
      },{
            new:true,
      })
      
      res.status(200).json({
            success:true,
      })
})