import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Successfully connected to the DB")
    } catch (error) {
        throw new Error("Couldn't connect to the DB")
    }
}

async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log("Successfully disconnected to the DB")
    } catch (error) {
        throw new Error("Couldn't safely disconnect to the DB")
    }    
}


export {connectDB, disconnectDB}