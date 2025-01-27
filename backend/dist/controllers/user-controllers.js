import User from "../models/User.js";
import { hash } from "bcrypt";
import { userSchema } from "../utils/types.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "OK",
            users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            err: error
        });
    }
};
export const signUpUser = async (req, res, next) => {
    try {
        const result = userSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "ERROR",
                errors: result.error.errors,
            });
        }
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "ERROR: A user with this email already exists",
            });
        }
        const hashedPass = await hash(password, 10);
        const user = new User({ name, email, password: hashedPass });
        await user.save();
        return res.status(200).json({
            message: "OK",
            id: user._id.toString()
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "ERROR",
            error: error.message || "An unknown error occurred",
        });
    }
};
//# sourceMappingURL=user-controllers.js.map