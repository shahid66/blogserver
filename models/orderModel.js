const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
  {
    userId: {  
      type: ObjectId,
      ref: "Users",  
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, " Please add a Email"],
      
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    list: {
      type:Array,
      default:[]
    },
    totalPrice: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true, versionKey: false }
);



const OrderModel = mongoose.model("Orders", orderSchema);
module.exports = OrderModel;
