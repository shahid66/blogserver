const express=require('express')
const { updateUser, deleteUser, getUser, getUsers, followUser, unFollowUser } = require('../controllers/UserController')
const { verifyUser, verifyToken } = require('../middleware/AuthMiddleware')



const route=express.Router()



route.put('/users/:id',verifyToken,verifyUser,updateUser)
route.delete('/users/:id',verifyUser,verifyUser,deleteUser)
route.get('/users/:id',verifyToken,getUser)
route.get('/users',verifyToken,getUsers)



module.exports=route