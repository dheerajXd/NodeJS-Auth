const Image=require('../models/image')
const {uploadCloudinary}=require('../helpers/cloudinaryHelper')
const cloudinary=require('../config/cloudinary')


    const uploadImageController=async(req,res)=>{
       try{
        //check if file is missing in req object
         if(!req.file){
            return res.status(400).json({
                success:false,
                message:'File not found.Please upload'
            })
        }
        //upload to cloudinary
       const {url,publicId}= await uploadCloudinary(req.file.path)
        //store the  image url and public id along with uploaded user id in database
        const newlyUploadedImage=new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })
        await newlyUploadedImage.save()
        return res.status(201).json({
            success:true,
            message:'Image uploaded successfully',
            data:newlyUploadedImage
        })
       }
       catch(error){
        console.log('Some error occurred',error)
        res.status(500).json({
            success:false,
            message:'Server error'
        })
       }
    }
    const deleteImageController=async(req,res)=>{
        try{
            const imageId=req.params.id
            const userId=req.userInfo.userId
            const checkImage=await Image.findById(imageId) 
            if(!checkImage){
                return res.json({
                    success:false,
                    message:'Image not found'
                })
            }
            //checking if the current user who is trying to delete the image is same as the one who is uploading the image
           if(checkImage.uploadedBy.toString()!==userId){
            return res.json({
                success:false,
                message:'You dont have the right to delete this image because it was uploaded by someone else'
            })
           }

          
           //delete the image from you cloudinary storage
           await cloudinary.uploader.destroy(checkImage.publicId)
            await Image.findByIdAndDelete(imageId)

            return res.status(200).json({
                success:true,
                message:'Image Deleted successfully'
            })
        }
        catch(e){
            console.log('Some error occurred',e)
        res.status(500).json({
            success:false,
            message:`Server error: ${e.message}`
        })
        }
    }
     const fetchImagesController=async(req,res)=>{
               try{
                const page=parseInt(req.query.page) || 1
                const limit=parseInt(req.query.limit) || 5
                const skip=(page-1)*limit
                const totalImages=await Image.countDocuments()
                const totalPages=Math.ceil(totalImages/limit)

                const sortBy=req.query.sortBy || 'createdAt'
                const sortOrder=req.query.sortOrder === 'asc'? 1 : -1
                const sortObj={}
                sortObj[sortBy]=sortOrder

                 const images=await Image.find().sort(sortObj).skip(skip).limit(limit)
                if(images){
                    return res.status(200).json({
                        success:true,
                        currentpage:page,
                        totalPages:totalPages,
                        totalImages:totalImages,
                        data:images
                    })
                }
               }
               catch(e){
                console.log('Server error')
                return res.status(500).json({
                    success:false,
                    message:`${e.message}`
                })
               }

           }
    module.exports={uploadImageController,deleteImageController,fetchImagesController}
