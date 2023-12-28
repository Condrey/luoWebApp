import {z} from "zod";
// Topic
export const createTopicSchema = z.object(({
    title: z.string().min(1, {message: "Every topic needs a title"}),
}))

export type CreateTopicSchema = z.infer<typeof createTopicSchema>
export type UpdateTopicSchema = z.infer<typeof updateTopicSchema>

export const updateTopicSchema = createTopicSchema.extend(({
    id: z.string().min(1)
}))

export const deleteTopicSchema = z.object({
    id: z.string().min(1)
})
// Comment
export const createCommentSchema = z.object(({
    comment: z.string().min(1, {message: "Comment field can not be empty"}),
    topicId: z.string().optional(),
}))

export type CreateCommentSchema = z.infer<typeof createCommentSchema>
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>

export const updateCommentSchema = createCommentSchema.extend(({
    id: z.string().min(1)
}))

export const deleteCommentSchema = z.object({
    id: z.string().min(1)
})
