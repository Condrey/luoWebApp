'use server'
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {ServerMessage} from "@/lib/utils";
import {
    createCommentSchema,
    CreateCommentSchema,
    deleteCommentSchema,
    updateCommentSchema,
    UpdateCommentSchema
} from "@/lib/db/validation/topic";
import {TopicComment} from "@prisma/client";


export async function createComment(formData: CreateCommentSchema): Promise<ServerMessage> {
    //Validate form fields using Zod
    const parseResult = createCommentSchema.safeParse(formData)
    //If form validation occurs, return errors early, otherwise, proceed.
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
            message: 'Missing fields. Failed to create comment.',
        }
    }
//Prepare data for insertion into the database
    const {comment, topicId} = parseResult.data

    'use server'
    const {userId} = auth()

    //Check if user is permitted to perform this action
    if (!userId) {
        console.error("Not authorized")
        return {
            type: "warning",
            message: 'You are unauthorized to perform this action.'
        }
    }
    // Insert data into the database
    try {
        await prisma.topicComment.create({
            data: {
                comment,
                authorId: userId,
                topicId
            }
        })

    } catch (e) {
        //If a database error occurs, return a more specific error.
        console.error(e)
        return {
            type: 'error',
            message: 'Database error: Failed to add comment.'
        }

    }


    return {
        type: 'success',
        title: 'Hooray.!',
        message: 'Successfully submitted your comment for this discussion'
    }
}

export async function updateComment(formData: UpdateCommentSchema): Promise<ServerMessage> {

    const parseResult = updateCommentSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
            message: 'Missing fields. Failed to update comment.',
        }
    }

    const {comment, topicId, id} = parseResult.data
    const topicComment = await prisma.topicComment.findUnique({where: {id}})
    if (!topicComment) {
        return {message: 'Comment not found', type: 'error', title: '404'}
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== topicComment.authorId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action', type: 'warning'
        }
    }

    try {
        await prisma.topicComment.update({
            where: {id},
            data: {
                comment,
                topicId
            }
        })

    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Update Comment.', type: 'error'};
    }
    return {
        type: 'success',
        title: 'Done.!',
        message: 'Successfully edited Comment'
    }
}

export async function deleteComment(formData: TopicComment): Promise<ServerMessage> {
    const parseResult = deleteCommentSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
            message: 'Missing fields. Failed to delete comment.',
        }
    }
    const {id} = parseResult.data
    const topicComment = await prisma.topicComment.findUnique({where: {id}})
    if (!topicComment) {
        return {
            message: 'Comment not found',
            type: 'error'
        }
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== topicComment.authorId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action',
            type: 'warning',
        }
    }
    try {
        await prisma.topicComment.delete({where: {id}})
        return {message: "Comment deleted.!", type: 'success', title: 'Success.!'}
    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Delete Comment.', type: 'error'};
    }
}
