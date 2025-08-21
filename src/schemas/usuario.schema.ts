//ERRO
// import { DeepPartial } from "typeorm";

import z from "zod";


export const createUserSchema = z.object({
    nome: z.string().min(2,"nome é obrigatório"),
    email: z.string().email(),
    password: z.string(),
    telefone: z.string().min(11, "Número incorreto").max(11),
    admin: z.boolean().default(false),
    ativo: z.boolean().default(true)
})

export const returnUserSchema = createUserSchema.extend({
    id: z.number()
}).omit({password:true})


export const updateUserSchema = createUserSchema.partial().omit({password:true})
export const returnUserArraySchema = z.array(returnUserSchema)

export type CreateUser = z.infer<typeof createUserSchema>
export type returnUser = z.infer<typeof returnUserSchema>
export type returnAllUser = z.infer<typeof returnUserArraySchema>

//ERRO
// export type iUpdateUser = DeepPartial<typeof createUserSchema>