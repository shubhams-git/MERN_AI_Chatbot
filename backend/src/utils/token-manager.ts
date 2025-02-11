import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { env } from "process"
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id:string, email:string)=>{
    
    const payload = {id, email }
    const token = jwt.sign(payload, process.env.JWT_SECRET); 

    return token;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access, No token found" });
    }

    return new Promise<void>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Error in verify token");
                return res.status(401).json({ message: "Unauthorized Access" });
            }
            res.locals.jwtData = decoded; // Attach decoded data to res.locals
            resolve();
            next();
        });
    });
};