const express=require('express')
const router=express.Router()
const {registerUser,loginUser,changePassword}=require('../controllers/auth-controller')
const authMiddleWare = require('../middleware/auth-middleware')

//all routes related to authentication & authorization
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/change-password',authMiddleWare,changePassword)

module.exports=router