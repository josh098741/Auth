import mongoose from 'mongoose'

const connectDB = async (url) => {
    try{
        await mongoose.connect(url)
        console.log("Connected to the database successfully")
    }catch(error){
        console.log("Faiiled to connect to the database")
        process.exit(1)
    }
}

export default connectDB