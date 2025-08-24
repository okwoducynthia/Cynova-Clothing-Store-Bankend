const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const UserSchema = mongoose.Schema(
  {
    // Title is an example of a data field structure
    
    firstName:{
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique:true
    },
    phoneNumber:{
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    },
    cartData:{
      type: Object,
      default: {},
    },


  },


  {
    timestamps:true
  }
)

UserSchema.pre("save", async function (next:any) {
try {
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(this.password, salt);
this.password = hashedPassword;
next();
} catch (error) {
next(error);
}
});

module.exports = mongoose.model("User", UserSchema)