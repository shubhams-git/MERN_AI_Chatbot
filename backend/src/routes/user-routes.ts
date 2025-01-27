import { Router } from "express";
import { getAllUsers, signUpUser } from "../controllers/user-controllers.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)

userRoutes.post("/signup", signUpUser)


export default userRoutes;