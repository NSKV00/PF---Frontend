import z from "zod";
import { returnUserSchema } from "./usuario.schema";


export const loginSchemas = z.object ({
    email: z.string().email(),
    password: z.string()
})

export const loginReturnSchemas = z.object ({
    user: returnUserSchema,
    token: z.string()
})

export type loginUser = z.infer<typeof loginSchemas>
export type returnLogin = z.infer<typeof loginReturnSchemas>