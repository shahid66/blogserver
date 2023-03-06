const express=require('express')

const { verifyUser, verifyToken } = require('../middleware/AuthMiddleware')

const { createOrder, getAllOrder } = require('../controllers/OrderController')




const route=express.Router()



route.post('/order',verifyToken,createOrder)
route.get('/orders',verifyToken,getAllOrder)




module.exports=route