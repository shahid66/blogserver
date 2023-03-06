const ProductModel = require("../models/productModel");


exports.createProduct = async (req, res) => {
  const { title, description, price, quantity } = req.body;

  if (req.file) {
    let fileData = {};
    fileData = {
      fileName: `${req.user._id + "-" + "post" + "-" + req.file.originalname}`,
      fileLocalPath: `${req.protocol}://${req.headers.host}/${
        req.user._id + "-" + "post" + "-" + req.file.originalname
      }`,
      fileType: req.file.mimetype,
    };
    const post = await ProductModel.create({
      userId: req.user._id,
      title,
      description,
      price,
      quantity,
      image: fileData,
    });
    if (post) {
      res.status(200).json("Post create successfull");
    } else {
      res.status(403).json("Something went wrong");
    }
  } else {
    const post = await PostModel.create({
      userId: req.user._id,
      title,
      description,
      price,
      quantity,
    });
    if (post) {
      res.status(200).json("Product create successfull");
    } else {
      res.status(403).json("Something went wrong");
    }
  }
};

exports.updateProduct=async (req,res)=>{
    
    try{
        const updateProduct= await ProductModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateProduct)
    }catch(error){
        res.status(500).json(error)
    }

}

exports.deleteProduct=async (req,res)=>{
        
    try{
        await ProductModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }catch(error){
        res.status(500).json(error)
    }

}
exports.getAllProduct=async (req,res)=>{
   
    try{
        const products= await ProductModel.find({})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json(error)
    }

}
exports.getProduct=async (req,res)=>{
    console.log(req.params.id)
    try{
        const product= await ProductModel.find({_id:req.params.id})
        res.status(200).json(product)
    }catch(error){
        res.status(500).json(error)
    }

}
