import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Register the users
export const regiser = async(req,res)=>{
    try {
        const {email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing.Please check!",
                success: false
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
               message: "Email already in use. Try a different one.",
               success: false,
            })
        }

        if(password.length <7){
            return res.status(409).json({
                message: "Password should be greater than 7 digits",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 15);

        await User.create({
            email,
            password: hashedPassword,
        })
        
        return res.status(200).json({
            message:"Account created successfully",
            success:true
        })

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

  //login

  export const login = async(req,res)=>{
    try {
        const {email, password } = req.body;

        if(!email || !password){
            return res.ststus(400).json({
                message:"Something is missing.Please check!",
                success: false
            })
        }

        let user = await User.findOne({email});

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect password",
                success:false
            });
        };

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: '7d'});

        const userData = {
            _id:user._id,
            email:user.email
        }
        return res.cookie('token', token, {httpOnly:true, secure: true, sameSite:"none", maxAge: 7*24*60*60*1000}).json({
            message:`Welcome back ${userData.email}`,
            success:true,
            // userData  // to return for forntend
            user: userData
        })
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
  }

    //logout
    export const logout  = async(_,res)=>{
    try {
       return res.cookie ("token", "", {maxAge:0}).status(200).json({
        message:"Logged out successfully.",
        success:true
       });
    } catch (error) {
        // console.log(error);
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};