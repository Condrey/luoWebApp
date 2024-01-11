import { z } from "zod";
import { LikeOrDislike } from "@prisma/client";

export const createLikeOrDislikeSchema = z.object({
  likeOrDislike: z.nativeEnum(LikeOrDislike),
  topicId: z.string().min(1, { message: "Topic is missing.!" }),
});

export type CreateLikeOrDislikeSchema = z.infer<
  typeof createLikeOrDislikeSchema
>;
export type UpdateLikeOrDislikeSchema = z.infer<
  typeof updateLikeOrDislikeSchema
>;

export const updateLikeOrDislikeSchema = createLikeOrDislikeSchema.extend({
  id: z.string().min(1),
});

export const deleteLikeOrDislikeSchema = z.object({
  id: z.string().min(1),
});
