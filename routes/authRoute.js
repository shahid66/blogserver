const express=require('express')
const { register, login } = require('../controllers/AuthController')

const route=express.Router()

route.post('/auth/register', register)
route.post('/auth/login', login)

module.exports=route