import express from "express";
import {config} from "dotenv";


const app = express()
config()
app.use(express.json())

app.get("/hello", (req,res)=>{
    return res.send("Response from /hello endpoint")
})

app.post("/:id",(req,res)=>{
    console.log(req.params.id)
    return res.send("Success")
})

export default app;