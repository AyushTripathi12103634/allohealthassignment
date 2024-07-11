import usermodel from "../models/usermodel.js";
import {hashPassword, comparePassword} from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";

export const registerController = async(req,res) => {
    try {
        const {email,password,username} = req.body;

        if(!username) return res.status(400).send({success:false,message:"Please enter username"});
        if(!email) return res.status(400).send({success:false,message:"Please enter email"});
        if(!password) return res.status(400).send({success:false,message:"Please enter password"});

        const username_check = await usermodel.findOne(username);
        if(username_check) return res.status(400).send({success:false,message:"username exists"});

        const email_check = await usermodel.findOne(email);
        if(email_check) return res.status(400).send({success:false,message:"email exists"});

        const hashpassword = await hashPassword(password);

        try {
            const user = new usermodel({
                username: username,
                email: email,
                password: hashpassword,
            }).save()
            return res.status(200).send({
                success: true,
                message: "User created successfully",
                user
            })
        } catch (error) {
            return res.status(500).send({success:false, message:"Error in registering user", error: error});
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in register API",
            error: error
        })
    }
}

export const loginController = async(req,res) => {
    try {
        const {username,password} = req.body;
        if(!username) return res.status(400).send({success:false,message:"Please enter username"});
        if(!password) return res.status(400).send({success:false,message:"Please enter password"});

        const user = await usermodel.findOne({username});
        if(!user) return res.status(404).send({success:false,message:"User not found"});

        const match = await comparePassword(password, user.password);
        if(!match) return res.status(401).send({success:false,message:"Wrong password"});

        const token = JWT.sign({user_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            id: user._id,
            token: token
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in login API",
            error: error
        })
    }
}