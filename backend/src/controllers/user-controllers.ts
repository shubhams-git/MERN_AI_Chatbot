import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import { hash, compare } from "bcrypt"
import { signInSchema, signUpSchema } from "../utils/types.js"
import { createToken } from "../utils/token-manager.js"
import { COOKIE_AGE, COOKIE_DOMAIN, COOKIE_NAME } from "../utils/constants.js"
import { set } from "mongoose"

export const getAllUsers = async(req:Request, res:Response, next: NextFunction)=>{
    try {
        const users = await User.find()
        return res.status(200).json({
            message:"OK",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "ERROR",
            err: error
        })
    }
}

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation Error",
                errors: result.error.errors,
            });
        }

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Conflict: A user with this email already exists",
            });
        }

        const hashedPass = await hash(password, 10);

        const user = new User({ name, email, password: hashedPass });
        await user.save();
        return res.status(201).json({
            message: "User created successfully",
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
};

export const signInUser = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const prom =(ms)=> new Promise((resolve,reject)=>{
            setTimeout(()=>{resolve("Finished")},ms)
        })
        await prom(2000);
        const result = signInSchema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({
                message: "Validation Error",
                errors: result.error.errors,
            });
        }
        const {email, password} = req.body

        const user = await User.findOne({email: email})
        if (!user){
            console.log("user is: "+ user)
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        const isMatched = await compare(password, user.password)
        console.log(`isMatched is: ${isMatched}, 
            hashedPass is  ${password},
            Pass from DB is ${user.password}`)
        if (!isMatched){
            return res.status(401).json({
                message: "Unauthorized Access"
            });            
        }
        res.clearCookie(COOKIE_NAME,{
            path: "/",
            domain: COOKIE_DOMAIN,
            httpOnly: true,
            signed:true
        })
        const token = createToken(user._id.toString(), user.email)
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: COOKIE_DOMAIN,
            maxAge: COOKIE_AGE,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
}
 