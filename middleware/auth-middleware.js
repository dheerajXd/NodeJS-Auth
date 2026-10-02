const jwt=require('jsonwebtoken')

const authMiddleWare=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    console.log(authHeader)
   const token=authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(400).json({
            success:false,
            message:'Access denied !! No token received!! Try again'
        })
    }
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodedToken)
        req.userInfo=decodedToken
        next()
    }catch(error){
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}
module.exports=authMiddleWare