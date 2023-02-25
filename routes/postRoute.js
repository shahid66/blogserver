const express=require('express')
const { createPost, updatePost, deletePost, getPost, getPosts,  } = require('../controllers/PostController')

const { verifyUser, verifyToken,  } = require('../middleware/AuthMiddleware')



const route=express.Router()



route.post('/post',verifyToken,createPost)
route.put('/post/:id',verifyToken,updatePost)
route.delete('/post/:id',verifyToken,deletePost)
route.get('/post/:id',verifyToken,getPost)
route.get('/post',verifyToken,getPosts)






module.exports=route