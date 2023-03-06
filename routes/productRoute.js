const express=require('express')

const { verifyUser, verifyToken } = require('../middleware/AuthMiddleware')
const { createProduct, updateProduct, deleteProduct, getAllProduct, getProduct } = require('../controllers/ProductController')
const { upload } = require('../helpers/PostfileUpload')



const route=express.Router()



route.post('/product',verifyToken,upload.single("image"),createProduct)
route.put('/product/:id',verifyToken,upload.single("image"),updateProduct)
route.delete('/product/:id',verifyToken,verifyUser,deleteProduct)
route.get('/product/:id',verifyToken,getProduct)
route.get('/products',getAllProduct)




module.exports=route