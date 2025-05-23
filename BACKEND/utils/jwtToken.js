const sendToken = (user,statusCode,res) => {
   const token = user.getJwtToken();
   
   const options ={
      expires:new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly:true,
      sameSite: "none", // use strict if development
      secure: true // false for development
   }

   res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        
   })
} 

module.exports = sendToken