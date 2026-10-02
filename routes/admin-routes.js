const express=require('express')
const router=express.Router()
const adminMiddleware=require('../middleware/admin-middleware')
const authMiddleWare = require('../middleware/auth-middleware')

router.get('/welcome',authMiddleWare,adminMiddleware,(req,res)=>{
    res.send('Welcome to the admin page')
})

module.exports=router
