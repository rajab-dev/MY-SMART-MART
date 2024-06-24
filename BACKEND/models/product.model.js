const mongoose = require("mongoose")


const  productSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  name:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  ratings:{
    type:Number,
    default:0
  },
  images:[

     {

    public_id:{
      type:String,
      required:true
    },

    url:{
      type:String,
      required:true
    },

      }

  ],
  category:{
    type:String,
    required:true
  },
  stock:{
    type:Number,
    default:1

  },

  numOfReviews:{
    type:Number,
    default:0
  },

  reviews:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
      },
      name:{
        type:String,
        required:true
      },
      rating:{
        type:Number,
        required:true
      },
      comment:{
        type:String,
        required:true
      }
    }
  ]

},{timestamps:true})

module.exports = mongoose.model("product",productSchema)