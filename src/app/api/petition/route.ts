import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {createPetitionSchema, deletePetitionSchema, updatePetitionSchema} from "@/lib/db/validation/petition";


export async function POST(req: Request) {
    try {
        const body = await req.json()
        //Validate form fields using Zod
        const parseResult = createPetitionSchema.safeParse(body)
        //If form validation occurs, return errors early, otherwise, proceed.
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

//Prepare data for insertion into the database
        const {district, showDetails} = parseResult.data

        const {userId} = auth()

        //Check if user is permitted to perform this action
        if (!userId) {
            console.error("Not authorized")
            return Response.json({error: 'You are unauthorized to perform this action.'}, {status: 401})
        }

        // Insert data into the database
        const petition = await prisma.petition.create({
            data: {
                district,
                showDetails,
                userId
            }
        })

        return Response.json({petition}, {status: 200})
    } catch (e) {
        //If a database error occurs, return a more specific error.
        console.error(e)
        return Response.json({error: "Database error: Failed to sign petition."}, {status: 500})
    }

}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const parseResult = updatePetitionSchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Missing fields. Failed to update petition.'}, {status: 400})
        }

        const {district, showDetails, id} = parseResult.data
        const petition = await prisma.petition.findUnique({where: {id}})
        if (!petition) {
            return Response.json({error: 'Petition not found'}, {status: 404})
        }
        const {userId} = auth()
        if (!userId || userId !== petition.userId) {
            console.error("Not authorized")
            return Response.json({error: 'You are unauthorized to perform this action.'}, {status: 401})
        }
        const updatePetition = await prisma.petition.update({
            where: {id},
            data: {
                district,
                showDetails,
            }
        })
        return Response.json({updatePetition}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Database Error: Failed to Update Petition."}, {status: 500})
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json()
        const parseResult = deletePetitionSchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Missing fields. Failed to delete petition.'}, {status: 400})
        }

        const {id} = parseResult.data
        const petition = await prisma.petition.findUnique({where: {id}})
        if (!petition) {
            return Response.json({error: 'Petition not found'}, {status: 404})
        }
        const {userId} = auth()
        if (!userId || userId !== petition.userId) {
            console.error("Not authorized")
            return Response.json({error: 'User not authorized to perform action'}, {status: 401})
        }
        await prisma.petition.delete({where: {id}})

        return Response.json({message: "Petition deleted.!"}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Database Error: Failed to Delete petition."}, {status: 500})
    }
}
