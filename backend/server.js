import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

import connectDB from './lib/db.js'
import authRoutes from './routes/authRoutes.js'
 
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server running on PORT : ${PORT}`)
        })
    }catch(error){
        console.log("Failed to start the server")
    }
}

start()