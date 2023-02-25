
const UserModel =require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const PostModel = require('../models/PostModel');

exports.verifyToken=async(req,res,next)=>{
    try {
       
        const token=req.cookies.access_token;
        

    if(!token){
        res.status(401)
        throw new Error("Not authorized")
    }
    const verified=jwt.verify(token,process.env.JWT_SECRET)
   
    let user=await UserModel.findById(verified.id).select("-password")

    if(!user){
        res.status(401)
        throw new Error("User not found") 
    }
    
    req.user=user
    next();
    
    } catch (error) {
        res.status(401)
        throw new Error("Not authorized")
    }
}

exports.verifyUser=(req,res,next)=>{
    
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403)
        throw new Error("Not authorized")
        }
    
}
exports.verifyUserPost= async(req,res,next)=>{
    const post= await PostModel.findById(req.params.id)
    
        if(req.user.id === post.userId || req.user.isAdmin){
            next()
        }else{
            res.status(403)
        throw new Error("Not authorized")
        }
    
}
exports.verifyIsAdmin=(req,res,next)=>{
    
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403)
        throw new Error("Not authorized")
        }
    
}