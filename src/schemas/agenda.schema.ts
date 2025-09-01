import z from "zod";

export const createAgendaSchema = z.object({
    hora: z.string().regex(/^([0-1]?\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Hora inválida"),
    diaMes: z.string().min(1, "Dia do mês obrigatório"),
    mes: z.string().min(1, "Mês obrigatório"),
    ano: z.string().min(4, "Ano obrigatório"),
    usuario: z.number(),
    funcionario: z.number(),
    ddsemana: z.number(),
    ativo: z.boolean().default(false)
})

export const returnAgendaSchema = createAgendaSchema.extend({
    id: z.number()
})

export const updateAgendaSchema = createAgendaSchema.partial()
export const returnAgendaArraySchema = z.array(returnAgendaSchema)

export type CreateAgenda = z.infer<typeof createAgendaSchema>
export type returnAgenda = z.infer<typeof returnAgendaSchema>
export type returnAllAgenda = z.infer<typeof returnAgendaArraySchema>
