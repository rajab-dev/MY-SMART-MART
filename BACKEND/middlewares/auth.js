const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncError( async (req,res,next) => {
    const { token } = req.cookies
    
    if(!token){
      return next(new ErrorHandler("Please Login to continue",401))
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findById(decodedToken.id)
    
    if(!user){
      return next(new ErrorHandler("Please Login to continue",401))
    }

    req.user = user
    next();

})


exports.authorizeRoles = (...roles) => {

    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
          
          return next (new ErrorHandler(`Role: '${req.user?.role}' is not allowed to access this resource`,403))
        }
       next();
    }

}