import { Router } from "express";
import { getAllUsers, signInUser, signOutUser, signUpUser, verifyUser } from "../controllers/user-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", signUpUser)
userRoutes.post("/signin", signInUser)
userRoutes.get("/auth-status",verifyToken, verifyUser);
userRoutes.get("/signout",verifyToken, signOutUser);


export default userRoutes;