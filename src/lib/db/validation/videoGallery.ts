import {z} from "zod";

export const createVideoGallerySchema = z.object(({
    title: z.string().min(1, {message: "Title is required, please add one"}),
    url: z.string().min(1, {message: "YouTube Url is required"}),
    categoryId: z.string().min(1, {message: "Please specify the category of your video"}),
    description: z.string().min(1, {message: "All the videos must have a description"}),
}))

export type CreateVideoGallerySchema = z.infer<typeof createVideoGallerySchema>

export const updateVideoGallerySchema = createVideoGallerySchema.extend(({
    id: z.string().min(1)
}))

export const deleteVideoGallerySchema = z.object({
    id: z.string().min(1)
})
