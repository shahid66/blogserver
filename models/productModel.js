const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
    userId: {  
        type: ObjectId,
        ref: "Users",  
      },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
        type: Object,
        default: {
          fileName: "demo.png",
          fileLocalPath:"",
          fileType: "",
          fileSize: "",
        },
      },
   
  },
  { timestamps: true, versionKey: false }
);



const ProductModel = mongoose.model("Products", productSchema);
module.exports = ProductModel;
