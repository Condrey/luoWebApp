"use server";
import prisma from "@/lib/db/prisma";
import { ServerMessage } from "@/lib/utils";
import {
  CreateDonateReminderSchema,
  createDonationReminderSchema,
} from "@/lib/db/validation/donation-reminder";
import { auth } from "@clerk/nextjs";

export async function createDonateReminder(
  formData: CreateDonateReminderSchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = createDonationReminderSchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message: "Missing fields. Failed to create reminder.",
    };
  }
  //Prepare data for insertion into the database
  // const { userId } = parseResult.data;
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
    await prisma.donateReminder.create({
      data: {
        userId,
      },
    });
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to create your reminder.",
    };
  }

  return {
    type: "success",
    title: "Hooray.!",
    message: "Successfully submitted your request to be reminded.",
  };
}

//
// export async function updateComment(formData: UpdateCommentSchema): Promise<ServerMessage> {
//
//     const parseResult = updateCommentSchema.safeParse(formData)
//     if (!parseResult.success) {
//         console.error(parseResult.error)
//         return {
//             errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
//             type: 'error',
//             message: 'Missing fields. Failed to update comment.',
//         }
//     }
//
//     const {comment, topicId, id} = parseResult.data
//     const topicComment = await prisma.topicComment.findUnique({where: {id}})
//     if (!topicComment) {
//         return {message: 'Comment not found', type: 'error', title: '404'}
//     }
//
//     'use server'
//     const {userId} = auth()
//     if (!userId || userId !== topicComment.authorId) {
//         console.error("Not authorized")
//         return {
//             message: 'User not authorized to perform action', type: 'warning'
//         }
//     }
//
//     try {
//         await prisma.topicComment.update({
//             where: {id},
//             data: {
//                 comment,
//                 topicId
//             }
//         })
//
//     } catch (e) {
//         console.error(e)
//         return {message: 'Database Error: Failed to Update Comment.', type: 'error'};
//     }
//     return {
//         type: 'success',
//         title: 'Done.!',
//         message: 'Successfully edited Comment'
//     }
// }
//
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
