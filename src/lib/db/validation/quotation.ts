import {z} from "zod";

export const createQuotationSchema = z.object(({
    title: z.string().min(1, {message: "Title is required"}),
    content: z.string().min(1, {message: "Please write the quote"}),
    occupation: z.string().min(1, {message: "Optionally add an occupation"}).optional(),
}))

export type CreateQuotationSchema = z.infer<typeof createQuotationSchema>
export type UpdateQuotationSchema = z.infer<typeof updateQuotationSchema>

export const updateQuotationSchema = createQuotationSchema.extend(({
    id: z.string().min(1)
}))

export const deleteQuotationSchema = z.object({
    id: z.string().min(1)
})
