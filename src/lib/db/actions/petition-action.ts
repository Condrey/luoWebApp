'use server'
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {
    createPetitionSchema,
    CreatePetitionSchema,
    deletePetitionSchema,
    updatePetitionSchema
} from "@/lib/db/validation/petition";


export async function createPetition(formData: CreatePetitionSchema) {
    console.log('submitting: ', formData)
    //Validate form fields using Zod
    const parseResult = createPetitionSchema.safeParse(formData)
    //If form validation occurs, return errors early, otherwise, proceed.
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: parseResult.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create petition.',
        }
    }
//Prepare data for insertion into the database
    const {district, showDetails} = parseResult.data

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
        await prisma.petition.create({
            data: {
                district,
                showDetails,
                userId
            }
        })

    } catch (e) {
        //If a database error occurs, return a more specific error.
        console.error(e)
        return {
            message: 'Database error: Failed to sign petition.'
        }

    }
    // Revalidate the cache for petitions page and redirect the user
    revalidatePath('/petition')
    redirect('/petition')
}

export async function updatePetition(formData: CreatePetitionSchema) {

    const parseResult = updatePetitionSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: parseResult.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to update petition.',
        }
    }

    const {district, showDetails, id} = parseResult.data
    const petition = await prisma.petition.findUnique({where: {id}})
    if (!petition) {
        return {message: 'Quotation not found'}
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== petition.userId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action'
        }
    }

    try {
        await prisma.petition.update({
            where: {id},
            data: {
                district,
                showDetails,
            }
        })

    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Update Petition.'};
    }
    revalidatePath('/petition')
    redirect('/petition')
}

export async function deletePetition(formData: CreatePetitionSchema) {

    const parseResult = deletePetitionSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: parseResult.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to delete petition.',
        }
    }
    const {id} = parseResult.data
    const petition = await prisma.petition.findUnique({where: {id}})
    if (!petition) {
        return {
            message: 'Petition not found'
        }
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== petition.userId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action'
        }
    }
    try {
        await prisma.petition.delete({where: {id}})
        revalidatePath('/petition')
        return {message: "Petition deleted.!"}
    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Delete Petition.'};
    }
}
