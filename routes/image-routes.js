console.log("IMAGE ROUTES LOADED");

const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/auth-middleware')
const adminMiddleware=require('../middleware/admin-middleware')
const uploadMiddleware=require('../middleware/upload-middleware')
const {uploadImageController,deleteImageController,fetchImagesController}=require('../controllers/image-controller')

//upload a new image
router.post('/upload',
    authMiddleware,
    adminMiddleware,
    uploadMiddleware.single('image'),
    uploadImageController)
router.get('/get',authMiddleware,fetchImagesController)
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController) 
                  
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Image router works'
    });
})
module.exports=router