const UserModel = require("../models/userModel")

exports.updateUser=async (req,res)=>{
    
    try{
        const updateUser= await UserModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
    }catch(error){
        res.status(500).json(error)
    }

}
exports.deleteUser=async (req,res)=>{
    
    try{
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    }catch(error){
        res.status(500).json(error)
    }

}
exports.getUser=async (req,res)=>{
    
    try{
        const user= await UserModel.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }

}
exports.getUsers=async (req,res)=>{
    
    try{
        const users= await UserModel.find()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json(error)
    }

}



