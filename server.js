require("dotenv").config()
const express=require("express")
const app=express()

const PORT=process.env.PORT || 3000



const connectToDB=require("./database/db")
connectToDB()
//middleware
app.use(express.json())


const authRoutes=require('./routes/auth-routes')
const homeRoutes=require('./routes/home-routes')
const adminRoutes=require('./routes/admin-routes')
const imageRoutes=require('./routes/image-routes')



console.log("IMAGE ROUTER IMPORTED");

app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/image',imageRoutes)



app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})