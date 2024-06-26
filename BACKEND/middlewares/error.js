const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
     err.statusCode = err.statusCode ||  500
     err.message = err.message || "internal server error"

     
    if(err.name === "CastError"){
      const message = `Resource not found. invalid: ${err.path}`
      err = new ErrorHandler(message,400)
    } 

    if(err.name===11000){
       const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
      err = new ErrorHandler(message,400)
    } 

    if(err.name==='JsonWebTokenError'){
      const message = `Json Web Token is invalid try again `
     err = new ErrorHandler(message,400)
   } 

   if(err.name==='TokenexpiredError'){
    const message = `Json Web Token is Expired try again `
   err = new ErrorHandler(message,400)
 } 


     res.status(err.statusCode).json({
      success: false,
      message: err.message

      
     })
}