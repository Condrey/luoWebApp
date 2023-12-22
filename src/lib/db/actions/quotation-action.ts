'use server'
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {
    CreateQuotationSchema,
    createQuotationSchema,
    deleteQuotationSchema,
    updateQuotationSchema
} from "@/lib/db/validation/quotation";
import {Quotations} from ".prisma/client";


export async function createQuotation(formData: CreateQuotationSchema) {
    console.log('submitting: ', formData)
    //Validate form fields using Zod
    const parseResult = createQuotationSchema.safeParse(formData)
    //If form validation occurs, return errors early, otherwise, proceed.
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: parseResult.error.flatten().fieldErrors,
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
            message: 'Database error: Failed to add quotation.'
        }

    }
    // Revalidate the cache for quotations page and redirect the user
    revalidatePath('/grievances/quotations')
    redirect('/grievances/quotations')
}

export async function updateQuotation(formData: CreateQuotationSchema) {

    const parseResult = updateQuotationSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: parseResult.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update quotation.',
        }
    }

    const {title, content, occupation, id} = parseResult.data
    const quotation = await prisma.quotations.findUnique({where: {id}})
    if (!quotation) {
        return {message: 'Quotation not found'}
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== quotation.authorId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action'
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
        return {message: 'Database Error: Failed to Update Quotation.'};
    }
    revalidatePath('/grievances/quotations')
    redirect('/grievances/quotations')
}

export async function deleteQuotation(formData: Quotations) {

    const parseResult = deleteQuotationSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: parseResult.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to delete quotation.',
        }
    }
    const {id} = parseResult.data
    const quotation = await prisma.quotations.findUnique({where: {id}})
    if (!quotation) {
        return {
            message: 'Quotation not found'
        }
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== quotation.authorId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action'
        }
    }
    try {
        await prisma.quotations.delete({where: {id}})
        revalidatePath('/grievances/quotations')
        return {message: "Quotation deleted.!"}
    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Delete Quotation.'};
    }
}
