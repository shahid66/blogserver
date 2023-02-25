const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config();
const morgan=require('morgan')
const path = require("path");
const { readdirSync } = require("fs");
const cookieParser = require('cookie-parser')
const errorHandlear = require('./middleware/errorMiddleware');
const app=express()

app.use(cors(
    {credentials:true, origin:'http://localhost:3000/'}
))

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

app.use(errorHandlear)
const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE).then(()=>console.log("DB connect successfully")).catch((err)=>console.log("DB Error => ", err))

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})