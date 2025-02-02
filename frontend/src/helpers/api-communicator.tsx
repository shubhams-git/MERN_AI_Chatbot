import axios from "axios"
export const signInUser = async(email: string, password:string)=>{
    const res = await axios.post("/user/signin", {email, password})

    if(res.status !== 200){
        return "ERROR"
    }else{
        const result = await res.data
        return result;
    }
}