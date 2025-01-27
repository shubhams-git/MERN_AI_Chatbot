import { Router } from "express";
import { getAllUsers, signInUser, signUpUser } from "../controllers/user-controllers.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", signUpUser)
userRoutes.post("/signin", signInUser)


export default userRoutes;