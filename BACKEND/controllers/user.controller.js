const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const userModel = require("../models/user.model")
const sendToken = require("../utils/jwtToken")
const { sendEmail } = require("../utils/sendEmail")
const cloudinary = require("cloudinary")
const crypto = require("crypto")


exports.registerUser = catchAsyncErrors(async(req,res,next)=> {
  const myClould = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale"
  })
    const {name,email,password} = req.body
    const user = await userModel.create({
      name,email,password,avatar:{
        public_id:myClould.public_id,
        url:myClould.secure_url,
      }
    })

   sendToken(user,201,res)
    
})


exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
  const {email,password} = req.body

  if(!email || !password){
     return next(new ErrorHandler("Please enter email & password",400))
  }

  const user = await userModel.findOne({email}).select("+password")

  if(!user){
     return next(new ErrorHandler("invalid email or password"))
  }
    
   const isPassMatched = await user.comparePassword(password)

   if(!isPassMatched){
    return next(new ErrorHandler("invalid email or password"))
   }

   sendToken(user,200,res)

})


exports.logOut = catchAsyncErrors( async (req,res,next)=> {
     
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true

  })

   res.status(200).json({
    success:true,
    message:"Logged Out Successfully"
   })
})

exports.forgotPassword = catchAsyncErrors( async (req,res,next) => {

    const user = await userModel.findOne({email:req.body.email})

    if(!user){
      return next(new ErrorHandler("user not found",404))
    }

    // const getResetPasswordToken = user.getResetPasswordToken();
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {

      await sendEmail({
        email:user.email,
        subject:"SMART MART Password Recoverey",
        message,
      })

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
      
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave:false});
      next(new ErrorHandler(error.message,500))  
    }
})


exports.resetPassword = catchAsyncErrors( async (req,res,next) => {

  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
  })

  if(!user){
    return next(new ErrorHandler("Password reset token is invalid or has been expired",400))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password do not match",400))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user,200,res)

})

exports.getUserDetails = catchAsyncErrors( async ( req,res,next) => {
     const user = await userModel.findById(req.user.id)

     res.status(200).json({
      success:true,
      user
     })
})

exports.updatePassword = catchAsyncErrors( async ( req,res,next) => {
  const user = await userModel.findById(req.user.id).select("+password")

  const isPassMatched = await user.comparePassword(req.body.oldPassword)

   if(!isPassMatched){
    return next(new ErrorHandler("old password is incorrect",400))
   }


   if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("password does'nt match",400))
   }


   user.password = req.body.newPassword
   await user.save();

   sendToken(user,200,res)



  res.status(200).json({
   success:true,
  })
})

exports.updateProfile = catchAsyncErrors( async (req,res,next) =>{

     const newUserData = {
       name:req.body.name,
       email:req.body.email 
     }
      
    //  console.log("avatar",req.body.avatar)
    //  const isAlreadyExist = await userModel.findOne({email:newUserData.email})

    //  if(isAlreadyExist){
    //    return next(new ErrorHandler(`this Email : '${newUserData.email}' already exists`,400))   
    //  }


     if(req.body.avatar !== ""){
        const user =  await userModel.findById(req.user.id)
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myClould = await cloudinary.v2.uploader.upload(req.body.avatar,{
          folder:"avatars",
          width:150,
          crop:"scale"
        })

       newUserData.avatar={
          public_id:myClould.public_id,
          url:myClould.secure_url,
     }

     } 

    


     const user = await userModel.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:true,
     })

     res.status(200).json({
      success:true,
      user
     })
})


exports.getAllUsers = catchAsyncErrors( async(req,res,next) => {
    const users = await userModel.find()
    res.status(200).json({
       success:true,
       users
    })
})


exports.getSingleUser = catchAsyncErrors( async(req,res,next) => {

  const user = await userModel.findById(req.params.id)

  if(!user){
    return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`,404))
   }

  res.status(200).json({
     success:true,
     user
  })
})

// update user profile by admin 

exports.updateUserRole = catchAsyncErrors( async (req,res, next) => {
     
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role 
  }

  const user = await userModel.findByIdAndUpdate(req.params.id,newUserData,{
   new:true,
   runValidators:true,
   useFindAndModify:true,
  })

  if(!user){
    return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`,404))
   }

  res.status(200).json({
   success:true
  })
  
})


// delete user by admin 

exports.deleteUser = catchAsyncErrors( async (req,res, next) => {
     

  const user = await userModel.findById(req.params.id)

  if(!user){
    return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`,400))
   }

   const imageId = user.avatar.public_id;

   await cloudinary.v2.uploader.destroy(imageId);

   await userModel.findByIdAndDelete(req.params.id)


  res.status(200).json({
   success:true,
   message:"User deleted successfully",
  })
  
})