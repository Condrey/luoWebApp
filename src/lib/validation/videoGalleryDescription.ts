import {z} from "zod";

export const createVideoPlaylistSchema = z.object(({
    description: z.string().min(1, {message: "Description is required, please add one"}),
    name: z.string().min(1, {message: "Title is required"}),

}))

export type CreateVideoPlaylistSchema = z.infer<typeof createVideoPlaylistSchema>

export const updateVideoPlaylistSchema = createVideoPlaylistSchema.extend(({
    id: z.string().min(1)
}))

export const deleteVideoPlaylistSchema = z.object({
    id: z.string().min(1)
})
