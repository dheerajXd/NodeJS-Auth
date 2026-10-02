const cloudinary=require('../config/cloudinary')

const uploadCloudinary=async(filePath)=>{
    try{
       const result= await cloudinary.uploader.upload(filePath)
        return {
            url:result.secure_url,
            publicId:result.public_id
        }
    }
    catch(error){
        console.log('Error uploading file to cloudinary',error)
        throw new Error('Error uploading file to cloudinary')
    }
}
module.exports={
    uploadCloudinary
}