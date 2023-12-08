import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import {
    createVideoPlaylistSchema,
    deleteVideoPlaylistSchema,
    updateVideoPlaylistSchema
} from "@/lib/validation/videoGalleryDescription";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const parseResult = createVideoPlaylistSchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

        const {name, description} = parseResult.data
        const {userId} = auth()
        if (!userId) {
            console.error("Not authorized")
            return Response.json({error: 'Unauthorized'}, {status: 401})
        }
        const playlist = await prisma.videoGalleryDescription.create({
            data: {
                name,
                description,
            }
        })

        return Response.json({playlist}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Internal server error"}, {status: 500})
    }

}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const parseResult = updateVideoPlaylistSchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

        const {id, name, description} = parseResult.data
        const playlist = await prisma.videoGalleryDescription.findUnique({where: {id}})
        if (!playlist) {
            return Response.json({error: 'Playlist not found'}, {status: 404})
        }
        const {userId} = auth()
        //TODO:
        // if (!userId || userId !== playlist.userId) {
        //     console.error("Not authorized")
        //     return Response.json({error: 'Unauthorized'}, {status: 401})
        // }
        const updatePlaylist = await prisma.videoGalleryDescription.update({
            where: {id},
            data: {
                name,
                description,
            }
        })
        return Response.json({updatePlaylist}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json()
        const parseResult = deleteVideoPlaylistSchema.safeParse(body)
        if (!parseResult.success) {
            console.error(parseResult.error)
            return Response.json({error: 'Invalid input'}, {status: 400})
        }

        const {id} = parseResult.data
        const playlist = await prisma.videoGalleryDescription.findUnique({where: {id}})
        if (!playlist) {
            return Response.json({error: 'Playlist not found'}, {status: 404})
        }
        //TODO
        // const {userId} = auth()
        // if (!userId || userId !== playlist.userId) {
        //     console.error("Not authorized")
        //     return Response.json({error: 'Unauthorized'}, {status: 401})
        // }
        await prisma.videoGalleryDescription.delete({where: {id}})

        return Response.json({message: "Playlist deleted.!"}, {status: 200})
    } catch (e) {
        console.error(e)
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}
