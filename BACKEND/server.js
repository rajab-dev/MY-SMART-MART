const app = require("./app")
const connectToDB = require("./config/database.connect");
const cloudinary = require("cloudinary");

const dotenv =  require("dotenv")

if (process.env.NODE_ENV !== "PRODUCTION") {
dotenv.config({path:"BACKEND/config/config.env"})
}
connectToDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})

app.listen(process.env.PORT, () => {
    console.log(`server listning on port ${process.env.PORT}`)
})