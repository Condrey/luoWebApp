import {z} from "zod";

export const createTopicSchema = z.object(({
    title: z.string().min(1, {message: "Every topic needs a title"}),
}))

export type CreateTopicSchema = z.infer<typeof createTopicSchema>

export const updateTopicSchema = createTopicSchema.extend(({
    id: z.string().min(1)
}))

export const deleteTopicSchema = z.object({
    id: z.string().min(1)
})
