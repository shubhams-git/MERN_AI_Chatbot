import jwt from "jsonwebtoken"
import { env } from "process"
export const createToken = (id:string, email:string)=>{
    
    const payload = {id, email }
    const token = jwt.sign(payload, process.env.JWT_SECRET); 

    return token;
}