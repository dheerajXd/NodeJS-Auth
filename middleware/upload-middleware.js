const multer=require('multer')
const path=require('path')

//set out multer storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,
            file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        )
    }
})
//file filter function
//file filter function
const checkFilterFunction = (req, file, cb) => {

    console.log("File name:", file.originalname);
    console.log("MIME type:", file.mimetype);

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = path.extname(file.originalname).toLowerCase();
    if(allowedExtensions.includes(extension)){
        cb(null,true) 
    }
    else{
        cb(new Error('File is not an image !! Upload images only'))
    }
};

//multer middleware
module.exports=multer({
    storage:storage,
    fileFilter:checkFilterFunction,
    limits:{
        fileSize:5*1024*1024 // 5MB
    }
})