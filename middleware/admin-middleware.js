
const adminMiddleware=(req,res,next)=>{
    if(req.userInfo.role!=='admin'){
        return res.status(403).json({
            success:false,
            message:'You dont have access to this page !!. Admin rights required'
        })
    }
    next()
}
module.exports=adminMiddleware