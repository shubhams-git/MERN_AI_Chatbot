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
    const token = req.headers.authorization?.split(' ')[1]; // Get from Authorization header
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        res.locals.jwtData = decoded;
        next();
    });
};