const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema(
  {
    userId: {  
      type: ObjectId,
      ref: "Users",  
    },
   
    title:{
      type:String,
      max:50,
      required: [true, " Please add a title"],
    },
    content:{
      type:String,
      required: [true, " Please add a content"],
    }

   
  },
  { timestamps: true, versionKey: false }
);
const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;