'use server'
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {
    CreateQuotationSchema,
    createQuotationSchema,
    deleteQuotationSchema,
    UpdateQuotationSchema,
    updateQuotationSchema
} from "@/lib/db/validation/quotation";
import {Quotations} from ".prisma/client";
import {ServerMessage} from "@/lib/utils";


export async function createQuotation(formData: CreateQuotationSchema): Promise<ServerMessage> {
    console.log('submitting: ', formData)
    //Validate form fields using Zod
    const parseResult = createQuotationSchema.safeParse(formData)
    //If form validation occurs, return errors early, otherwise, proceed.
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
            message: 'Missing fields. Failed to create quotation.',
        }
    }
//Prepare data for insertion into the database
    const {title, occupation, content} = parseResult.data

    'use server'
    const {userId} = auth()

    //Check if user is permitted to perform this action
    if (!userId) {
        console.error("Not authorized")
        return {
            message: 'You are unauthorized to perform this action.',
            type: 'warning'
        }
    }
    // Insert data into the database
    try {
        await prisma.quotations.create({
            data: {
                title,
                content,
                occupation: occupation!,
                authorId: userId
            }
        })
    } catch (e) {
        //If a database error occurs, return a more specific error.
        console.error(e)
        return {
            message: 'Database error: Failed to add quotation.', type: 'error'
        }

    }
    // Revalidate the cache for quotations page and redirect the user
    return {
        message: 'Your quotation has been created.',
        type: 'success', title: 'Done.!'
    }
}

export async function updateQuotation(formData: UpdateQuotationSchema): Promise<ServerMessage> {

    const parseResult = updateQuotationSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            message: 'Missing fields. Failed to update quotation.',
            title: 'Hold on',
            type: 'warning'
        }
    }

    const {title, content, occupation, id} = parseResult.data
    const quotation = await prisma.quotations.findUnique({where: {id}})
    if (!quotation) {
        return {message: 'Quotation not found', type: 'error', title: '404'}
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== quotation.authorId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action', title: 'Sorry', type: 'error'
        }
    }

    try {
        await prisma.quotations.update({
            where: {id},
            data: {
                title,
                content,
                occupation
            }
        })

    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Update Quotation.', type: "error"};
    }
    return {
        message: 'The action completed successfully.',
        title: "It's updated.!",
        type: 'success'
    }
}

export async function deleteQuotation(formData: Quotations): Promise<ServerMessage> {

    const parseResult = deleteQuotationSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            message: 'Missing fields. Failed to delete quotation.',
            type: 'error'
        }
    }
    const {id} = parseResult.data
    const quotation = await prisma.quotations.findUnique({where: {id}})
    if (!quotation) {
        return {
            message: 'Quotation not found', type: 'error', title: '404'
        }
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== quotation.authorId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action', type: 'error', title: 'Tread softly.!'
        }
    }
    try {
        await prisma.quotations.delete({where: {id}})
        return {message: "Quotation deleted.!", type: 'success', title: 'Done deal'}
    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Delete Quotation.', type: "error"};
    }
}
