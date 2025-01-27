import User from "../models/User.js";
import { hash } from "bcrypt";
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
        const { name, email, password } = req.body;
        console.log(req.body);
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
        return res.status(500).json({
            message: "ERROR",
            err: error
        });
    }
};
//# sourceMappingURL=user-controllers.js.map