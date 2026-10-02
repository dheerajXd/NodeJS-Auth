const User=require('../models/user')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

//register controller
const registerUser=async(req,res)=>{
    try{
          const {username,email,password,role}=req.body
          if(!username || !email || !password){
              return res.status(400).json({success:false,message:'username, email and password are required'})
          }
        const checkDuplicates=await User.findOne({
            $or:[{username},{email}]
        })
        if(checkDuplicates){
           return res.status(400).json({
                success:false,
                message:'User with the same username or email id exists. Try again with different User ID'
            })
        }
        else{
            const salt=await bcrypt.genSalt()
            const hashedPassword=await bcrypt.hash(password,salt)

            const newUser=new User({
                username,
                email,
                password:hashedPassword,
                role:role||'user'
            })
            await newUser.save()
            if(newUser){
              return  res.status(201).json({
                    success:true,
                    message:'User registered successfully'
                })
            }
            else{
              return  res.status(400).json({
                    success:false,
                    message:'Failed to create the User'
                })
            }
        }
    }catch(e){
        console.error(e)
        return res.status(500).json({
            success:false,
            message:'Some error occured !! Please try again'
         })
    }
}

//login controller
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
           return res.status(400).json({
                success:false,
                message:'User doesnt exist'
            })
        }
        else{
            const isPassword=await bcrypt.compare(password,user.password)
            if(!isPassword){
               return res.status(400).json({
                success:false,
                message:'Invalid credentials'
            })
            }
            //create user token
            const accessToken=jwt.sign({
                userId:user._id,
                username:user.username,
                role:user.role,
            },process.env.JWT_SECRET_KEY,
            {expiresIn:'15m'})
            
           return res.status(200).json({
                success:true,
                message:'User logged in',
                accessToken:accessToken
            })
        }

    }catch(e){
        console.error(e)
         return res.status(500).json({
            success:false,
            message:'Some error occured !,Please try again'
         })
    }
   
}
 const changePassword=async(req,res)=>{
        try{
            const userId=req.userInfo.userId
            const user=await User.findById(userId);
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:'User not found'
            })
            }
            const {oldPassword,newPassword}=req.body
            const isPassword=await bcrypt.compare(oldPassword,user.password)
            if(!isPassword){
                return res.status(400).json({
                    success:false,
                    message:'Your old password is incorrect'
            })
            }

            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(newPassword,salt);
            user.password=hashedPassword
            await user.save();

            return res.json({
                success:true,
                message:'Password changed successfully'
        })

        }
        catch(e){
            console.error(e)
         return res.status(500).json({
            success:false,
            message:`Some error occured !,Please try again,${e.message}`
         })
        }
    }
module.exports={registerUser,loginUser,changePassword}
