const  express  = require("express")
const  cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv =  require("dotenv")
const path = require("path");


const app = express();
app.use(cookieParser())


const errorMiddleware = require("./middlewares/error")

if (process.env.NODE_ENV !== "PRODUCTION") {
dotenv.config({path:"BACKEND/config/config.env"})
}

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

const product = require("./routes/product.routes")
const user = require("./routes/user.routes")
const order = require("./routes/order.routes")
const payment = require("./routes/payment.routes")


app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


app.use(errorMiddleware)

module.exports = app 