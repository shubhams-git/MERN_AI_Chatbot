import {z} from "zod"

export const signUpSchema = z.object({
    name: z.string({required_error:"The name is mandatory"}),
    email: z.string({required_error:"The email is mandatory"}).email(),
    password: z.string({required_error:"The password is mandatory"})
    .min(6, "Password must be atleast 6 letters")
})

export const signInSchema = z.object({
    email: z.string({required_error:"The email is mandatory"}).email(),
    password: z.string({required_error:"The password is mandatory"})
    .min(6, "Password must be atleast 6 letters")
})

export const chatSchema = z.object({
    message: z.string({required_error:"The message is mandatory"})
})