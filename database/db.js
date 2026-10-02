const mongoose=require('mongoose')
const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected sucessfully')
    }
    catch(e){
        console.error('MongoDB connection Failed:', e.message)
        console.log('URI:', process.env.MONGO_URL)
        process.exit(1)
    }
}
module.exports=connectToDB