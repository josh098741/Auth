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

export const login = async (req,res) => {}

export const logout = async (req,res) => {}