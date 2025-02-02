import { Router } from "express";
import { getAllUsers, signInUser, signUpUser, verifyUser } from "../controllers/user-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", signUpUser)
userRoutes.post("/signin", signInUser)
userRoutes.get("/auth-status",verifyToken, verifyUser);


export default userRoutes;