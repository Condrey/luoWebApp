"use server";
import prisma from "@/lib/db/prisma";
import { ServerMessage } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import {
  createLikeOrDislikeSchema,
  CreateLikeOrDislikeSchema,
  updateLikeOrDislikeSchema,
  UpdateLikeOrDislikeSchema,
} from "@/lib/db/validation/like-or-dislike";

export async function createLikeOdDislike(
  formData: CreateLikeOrDislikeSchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = createLikeOrDislikeSchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message: "Missing fields. Failed to create a like or dislike.",
    };
  }
  //Prepare data for insertion into the database
  const { likeOrDislike, topicId } = parseResult.data;
  const { userId } = auth();
  if (!userId) {
    console.error("Not authorized");
    return {
      message: "User not authorized to perform action",
      type: "warning",
    };
  }
  // Insert data into the database
  try {
    await prisma.topicLikeOrDisLike.create({
      data: {
        likeOrDislike,
        topicId,
        authorId: userId,
      },
    });
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to add your reaction.",
    };
  }

  return {
    type: "success",
    title: "Hooray.!",
    message: "Successfully submitted your reaction.",
  };
}

export async function updateLikeOrDislike(
  formData: UpdateLikeOrDislikeSchema,
): Promise<ServerMessage> {
  const parseResult = updateLikeOrDislikeSchema.safeParse(formData);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message: "Missing fields. Failed to update reaction.",
    };
  }

  const { likeOrDislike, topicId, id } = parseResult.data;
  const topicLikeOrDislike = await prisma.topicLikeOrDisLike.findUnique({
    where: { id },
  });
  if (!topicLikeOrDislike) {
    return { message: "Comment not found", type: "error", title: "404" };
  }

  ("use server");
  const { userId } = auth();
  if (
    !userId ||
    (userId !== topicLikeOrDislike.authorId &&
      userId !== "user_2YtZKRrHz7XhlJ1U2qNZnKidhGC")
  ) {
    console.error("Not authorized");
    return {
      message: "User not authorized to perform action",
      type: "warning",
    };
  }

  try {
    if (topicLikeOrDislike.likeOrDislike === likeOrDislike) {
      await prisma.topicLikeOrDisLike.update({
        where: { id },
        data: {
          likeOrDislike: "DEFAULT",
          topicId,
        },
      });
    } else {
      await prisma.topicLikeOrDisLike.update({
        where: { id },
        data: {
          likeOrDislike,
          topicId,
        },
      });
    }
  } catch (e) {
    console.error(e);
    return {
      message: "Database Error: Failed to Update your reaction.",
      type: "error",
    };
  }
  return {
    type: "success",
    title: "Done.!",
    message: "Successfully edited your reaction",
  };
}

// export async function deleteComment(formData: TopicComment): Promise<ServerMessage> {
//     const parseResult = deleteCommentSchema.safeParse(formData)
//     if (!parseResult.success) {
//         console.error(parseResult.error)
//         return {
//             errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
//             type: 'error',
//             message: 'Missing fields. Failed to delete comment.',
//         }
//     }
//     const {id} = parseResult.data
//     const topicComment = await prisma.topicComment.findUnique({where: {id}})
//     if (!topicComment) {
//         return {
//             message: 'Comment not found',
//             type: 'error'
//         }
//     }
//
//     'use server'
//     const {userId} = auth()
//     if (!userId || userId !== topicComment.authorId) {
//         console.error("Not authorized")
//         return {
//             message: 'User not authorized to perform action',
//             type: 'warning',
//         }
//     }
//     try {
//         await prisma.topicComment.delete({where: {id}})
//         return {message: "Comment deleted.!", type: 'success', title: 'Success.!'}
//     } catch (e) {
//         console.error(e)
//         return {message: 'Database Error: Failed to Delete Comment.', type: 'error'};
//     }
// }
