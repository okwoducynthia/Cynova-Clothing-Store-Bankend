const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema(
  {
    // Uploading Image Without an Array
    images:[
      {
        img:{
          type: String,
        }
      }
    ],
    productName:{
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: false,
    },
    Category:{
      type: String,
      required: true,
    },
    price:{
      type: String,
      required: true,
    },
    sizes:{
      type: Array,
      required: false,
    },
    deliveryStatus:{
      type: String,
      enum: ["Order Paid", "In Transit", "Delivered"],
      default: "Order Paid",
    },
    rating:{
      type: Number,
      required: false,
    },
    // sizes:{
    //   type: String,
    //   required: true,
    // },

  },


  {
    timestamps:true
  }
)

module.exports = mongoose.model("Products", ProductSchema)