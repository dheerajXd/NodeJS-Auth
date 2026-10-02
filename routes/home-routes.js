const express=require('express')
const router=express.Router()
const authMiddleWare=require('../middleware/auth-middleware')
const user = require('../models/user')

router.get('/welcome',authMiddleWare,(req,res)=>{
    const {username,userId,role}=req.userInfo

    res.json({
        sucess:true,
        message:'Welcome to the home page',
        user:{
           _id:userId,
            username,
            role
        }
    })
})

module.exports=router
