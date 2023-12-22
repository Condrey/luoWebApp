import {z} from "zod";

export const createPetitionSchema = z.object(({
    district: z.string().min(1, {message: "Please enter your district, required"}),
    showDetails: z.boolean().default(false),
}))

export type CreatePetitionSchema = z.infer<typeof createPetitionSchema>

export const updatePetitionSchema = createPetitionSchema.extend(({
    id: z.string().min(1)
}))

export const deletePetitionSchema = z.object({
    id: z.string().min(1)
})
