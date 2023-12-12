import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {
    createVideoGallerySchema,
    deleteVideoGallerySchema,
    updateVideoGallerySchema
} from "@/lib/validation/videoGallery";


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const parseResult = createVideoGallerySchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

        const {title, url, description, categoryId} = parseResult.data
        const {userId} = auth()
        if (!userId) {
            console.error("Not authorized")
            return Response.json({error: 'Unauthorized'}, {status: 401})
        }
        const video = await prisma.videoGallery.create({
            data: {
                title,
                url,
                categoryId,
                description,
                userId
            }
        })

        return Response.json({video}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Internal server error"}, {status: 500})
    }

}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const parseResult = updateVideoGallerySchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

        const {id, title, url, categoryId, description} = parseResult.data
        const video = await prisma.videoGallery.findUnique({where: {id}})
        if (!video) {
            return Response.json({error: 'Video not found'}, {status: 404})
        }
        const {userId} = auth()
        //TODO:
        // if (!userId || userId !== playlist.userId) {
        //     console.error("Not authorized")
        //     return Response.json({error: 'Unauthorized'}, {status: 401})
        // }
        const updateVideo = await prisma.videoGallery.update({
            where: {id},
            data: {
                title,
                url,
                categoryId,
                description
            }
        })
        return Response.json({updateVideo}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json()
        const parseResult = deleteVideoGallerySchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

        const {id} = parseResult.data
        const video = await prisma.videoGallery.findUnique({where: {id}})
        if (!video) {
            return Response.json({error: 'Video not found'}, {status: 404})
        }
        //TODO
        // const {userId} = auth()
        // if (!userId || userId !== playlist.userId) {
        //     console.error("Not authorized")
        //     return Response.json({error: 'Unauthorized'}, {status: 401})
        // }
        await prisma.videoGallery.delete({where: {id}})

        return Response.json({message: "Video deleted.!"}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}
