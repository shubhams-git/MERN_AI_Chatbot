import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import { hash, compare } from "bcrypt"
import { signInSchema, signUpSchema } from "../utils/types.js"
import { createToken } from "../utils/token-manager.js"
import { COOKIE_AGE, COOKIE_NAME } from "../utils/constants.js"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            message: "OK",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "ERROR",
            err: error
        })
    }
}

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation Error",
                errors: result.error.errors,
            });
        }

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Conflict: A user with this email already exists",
            });
        }

        const hashedPass = await hash(password, 10);

        const user = new User({ name, email, password: hashedPass });
        await user.save();

        // Generate token and return it in the response
        const token = createToken(user._id.toString(), user.email);
        return res.status(201).json({
            message: "User created successfully",
            name: user.name,
            email: user.email,
            token: token // Send token in response body
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
};

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prom = (ms) => new Promise((resolve, reject) => {
            setTimeout(() => { resolve("Finished") }, ms)
        });
        await prom(2000);

        const result = signInSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation Error",
                errors: result.error.errors,
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("user is: " + user);
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        // Generate token and return it in the response
        const token = createToken(user._id.toString(), user.email);
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
            token: token // Send token in response body
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prom = (ms) => new Promise((resolve, reject) => {
            setTimeout(() => { resolve("Finished") }, ms)
        })
        await prom(2000);

        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Unauthorized Access- Permissions did not match"
            });
        }

        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
}

export const signOutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prom = (ms) => new Promise((resolve, reject) => {
            setTimeout(() => { resolve("Finished") }, ms)
        });
        await prom(1000);
        console.log("Reached Signout");

        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Unauthorized Access- Permissions did not match"
            });
        }

        // No need to clear cookies anymore
        return res.status(200).json({
            message: "OK",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            cause: error.message || "An unknown error occurred",
        });
    }
};

