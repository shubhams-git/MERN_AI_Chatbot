import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const setAuthToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token); // Store token in localStorage
    } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token"); // Remove token from localStorage
    }
};


export const signInUser = async (email: string, password: string) => {
    const res = await axios.post("/user/signin", { email, password });
    if (res.status !== 200) {
        throw new Error("ERROR");
    }
    const { token, name, email: userEmail } = res.data;
    setAuthToken(token); // Set token after successful sign-in
    return { name, email: userEmail };
};


export const signUpUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", { name, email, password });
    if (res.status !== 200 && res.status !== 201) {
        throw new Error("ERROR");
    }
    const { token, name: userName, email: userEmail } = res.data;
    setAuthToken(token); 
    return { name: userName, email: userEmail };
};


export const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("ERROR");
    }
    return res.data;
};

export const sendChatRequest = async(message: string, modelId: string)=>{
    const res = await axios.post("/chat/new", {message, modelId})
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

export const signOutUser = async () => {
    const res = await axios.get("/user/signout");
    if (res.status !== 200) {
        throw new Error("ERROR");
    }
    setAuthToken(null); // Clear token on sign-out
    return "OK";
};