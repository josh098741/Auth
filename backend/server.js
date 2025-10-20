import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './lib/db.js'

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server running on PORT : ${PORT}`)
        })
    }catch(error){
        console.log()
    }
}

start()