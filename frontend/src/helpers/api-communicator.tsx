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

export const checkAuthStatus = async()=>{
    const res = await axios.get("/user/auth-status")
    if(res.status !== 200){
        return "ERROR"
    }else{
        const data = await res.data
        return data;
    }
}

export const sendChatRequest = async(message: string)=>{
    const res = await axios.post("/chat/new", {message})
    if(res.status !== 200){
        console.log(res)
        return "ERROR"
    }else{
        const data = await res.data
        return data;
    }
}

export const getAllChats = async()=>{
    const res = await axios.get("/chat/all-chats")
    if(res.status !== 200){
        console.log(res)
        return "ERROR"
    }else{
        const data = await res.data
        return data;
    }
}


export const deleteAllChats = async()=>{
    const res = await axios.delete("/chat/delete")
    if(res.status !== 200){
        console.log(res)
        return "ERROR"
    }else{
        return "OK"
    }
}

export const signOutUser = async()=>{
    console.log("Reached here")
    const res = await axios.get("/user/signout")
    if(res.status !== 200){
        console.log(res)
        return "ERROR"
    }else{
        return "OK"
    }
}