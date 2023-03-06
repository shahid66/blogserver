const express=require('express')

const { verifyUser, verifyToken } = require('../middleware/AuthMiddleware')
const { createProduct, updateProduct, deleteProduct, getAllProduct, getProduct } = require('../controllers/ProductController')
const { upload } = require('../helpers/PostfileUpload')
const { client_token, payment } = require('../controllers/PaymentController')



const route=express.Router()



route.get('/client_token',client_token)

route.post('/products',payment)




module.exports=route