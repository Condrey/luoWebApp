'use server'
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {
    createPetitionSchema,
    CreatePetitionSchema,
    deletePetitionSchema,
    updatePetitionSchema
} from "@/lib/db/validation/petition";
import {ServerMessage} from "@/lib/utils";


export async function createPetition(formData: CreatePetitionSchema): Promise<ServerMessage> {
    console.log('submitting: ', formData)
    //Validate form fields using Zod
    const parseResult = createPetitionSchema.safeParse(formData)
    //If form validation occurs, return errors early, otherwise, proceed.
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
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
            type: "warning",
            message: 'You are unauthorized to perform this action.'
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
            type: 'error',
            message: 'Database error: Failed to sign petition.'
        }

    }


    return {
        type: 'success',
        title: 'Hooray.!',
        message: 'Successfully created Petition'
    }
}

export async function updatePetition(formData: CreatePetitionSchema): Promise<ServerMessage> {

    const parseResult = updatePetitionSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
            message: 'Missing fields. Failed to update petition.',
        }
    }

    const {district, showDetails, id} = parseResult.data
    const petition = await prisma.petition.findUnique({where: {id}})
    if (!petition) {
        return {message: 'Quotation not found', type: 'error', title: '404'}
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== petition.userId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action', type: 'warning'
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
        return {message: 'Database Error: Failed to Update Petition.', type: 'error'};
    }
    return {
        type: 'success',
        title: 'Done.!',
        message: 'Successfully edited Petition'
    }
}

export async function deletePetition(formData: CreatePetitionSchema): Promise<ServerMessage> {

    const parseResult = deletePetitionSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return {
            errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
            type: 'error',
            message: 'Missing fields. Failed to delete petition.',
        }
    }
    const {id} = parseResult.data
    const petition = await prisma.petition.findUnique({where: {id}})
    if (!petition) {
        return {
            message: 'Petition not found',
            type: 'error'
        }
    }

    'use server'
    const {userId} = auth()
    if (!userId || userId !== petition.userId) {
        console.error("Not authorized")
        return {
            message: 'User not authorized to perform action',
            type: 'warning',
        }
    }
    try {
        await prisma.petition.delete({where: {id}})
        return {message: "Petition deleted.!", type: 'success', title: 'Success.!'}
    } catch (e) {
        console.error(e)
        return {message: 'Database Error: Failed to Delete Petition.', type: 'error'};
    }
}
