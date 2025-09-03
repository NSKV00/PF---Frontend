import z from "zod";
import fs from "fs";

export const createFuncionarioSchema = z.object({
  nome: z.string().min(2, "nome é obrigatório"),
  ativo: z.boolean().default(true),
  imagem: z.string().default(() => {
    return fs.readFileSync("assets/default.png").toString("base64")
  })
});

export const returnFuncionarioSchema = createFuncionarioSchema.extend({
  id: z.number(),
});

export const updateFuncionarioSchema = createFuncionarioSchema.partial();

export const returnFuncionarioArraySchema = z.array(returnFuncionarioSchema);

export type CreateFuncionario = z.infer<typeof createFuncionarioSchema>;
export type returnFuncionario = z.infer<typeof returnFuncionarioSchema>;
export type returnAllFuncionario = z.infer<typeof returnFuncionarioArraySchema>;