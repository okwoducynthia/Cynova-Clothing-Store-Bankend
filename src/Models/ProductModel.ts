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
    ProductStatus:{
      type: String,
      enum: ["Awaiting Payment", "Order Paid", "In Transit", "Delivered"],
      default: "Awaiting Payment",
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