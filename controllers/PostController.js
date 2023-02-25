
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const fs = require('fs')
const { promisify } = require('util');
const path = require("path");
const PostModel = require('../models/PostModel');
const UserModel = require('../models/userModel');

const unlinkAsync = promisify(fs.unlink)


exports.createPost= async(req,res)=>{
    try{
        
        const { title,content  } = req.body;
        
        
       //   Validation
       if (!title || !content) {
        res.status(400);
        throw new Error("Please fill in all fields");
      }
      const post = await PostModel.create({userId:req.user._id,title,content});
      if(post){
        res.status(200).json("Post create successfull")
      }else{
        res.status(403).json("Something went wrong")
      }
      
      
      }catch(err){
        res.status(404);
        console.log(err)
        throw new Error("Post not Create");
      }
    }

    exports.updatePost=async (req,res)=>{
    
        try{
            const updatePost= await PostModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatePost)
        }catch(error){
            res.status(500).json(error)
        }
    
    }
    exports.deletePost=async (req,res)=>{
        
        try{
            await PostModel.findByIdAndDelete(req.params.id)
            res.status(200).json("Post has been deleted")
        }catch(error){
            res.status(500).json(error)
        }
    
    }

    exports.getPost=async (req,res)=>{
    
        try{
            const post= await PostModel.findById(req.params.id).populate('userId','name')
            res.status(200).json(post)
        }catch(error){
            res.status(500).json(error)
        }
    
    }
    exports.getPosts=async (req,res)=>{
       
        console.log('ja')
        try{
            const posts= await PostModel.find({userId:req.user._id}).populate('userId','name')
            res.status(200).json(posts)
        }catch(error){
            res.status(500).json(error)
        }
    
    }


   

