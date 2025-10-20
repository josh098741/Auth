import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"})
}

export const signup = async (req,res) => {
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({ message: "All Input fields are required" })
        }

        const userExists = await User.findOne({ email })
        if(userExists){
            return res.status(400).json({ message: "User Already Exists" })
        }

        const user = await User.create({ name,email,password })
        const token = generateToken(user._id)

        res.cookie("token",token,{
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ 
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
         })

    }catch(error){
        console.error("Signup error", error)
        res.status(500).json({ message: "Internal server error in signup" })
    }
}

export const login = async (req,res) => {
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({ message: "All input fields are required" })
        }

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = generateToken(user._id)
        res.cookie("token",token,{
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }catch(error){
        console.error("Error in Login",error)
        res.status(500).json({ message: "Internal server error in Login" })
    }
}

export const logout = async (req,res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully" })
}