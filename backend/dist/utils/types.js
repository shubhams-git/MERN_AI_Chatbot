import { z } from "zod";
export const userSchema = z.object({
    name: z.string({ required_error: "The name is mandatory" }),
    email: z.string({ required_error: "The name is mandatory" }).email()
});
//# sourceMappingURL=types.js.map