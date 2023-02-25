
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const fs = require('fs')
const { promisify } = require('util');
const path = require("path");
const UserModel =require('../models/userModel')
const unlinkAsync = promisify(fs.unlink)

const generateToken=(id,isAdmin)=>{
  return jwt.sign({id:id,isAdmin},process.env.JWT_SECRET,{expiresIn:"1d"})
  }
// Create User
exports.register= async(req,res)=>{
    try{
        const { name, email,password } = req.body;
        
       //   Validation
       if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
      }
      const user = await UserModel.create({
        name, email,password, 
        
      });
      const token=generateToken(user._id)
      if(user){ 
        const {_id,name,email,}=user
        res
        .status(200)
        .json({ status: "success", token: token, data:{_id,name,email} });
      }else{
        
        res.status(404);
        throw new Error("User not create");
      }
      }catch(err){
        res.status(404);
        console.log(err)
        throw new Error("User already exists");
      }
    }

exports.login=async(req,res)=>{
 
    const {email,password}=req.body
  
    if(!email|| !password){
        res.status(400)
        throw new Error ("Please add email and password")
    }
  
    const user = await UserModel.findOne({email})
  
    if(!user){
        res.status(404)
        throw new Error ("User not found") 
    }
    const passwordIsCorrrect= await bcrypt.compare(password,user.password)
  
    const token=generateToken(user._id,user.isAdmin)
  
    if(user && passwordIsCorrrect){
        const {_id,name,email}=user
          
          res
            .cookie("access_token",token,{
                httpOnly:true,
            })
            .status(200)
            .json({data:{_id,name,email} });
    }else{
        res.status(400)
        throw new Error ("Invalid Email or Password") 
    }
  }
