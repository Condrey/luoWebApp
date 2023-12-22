import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";


//categories
export async function fetchVideos() {
    noStore()
    try {
        return await prisma.videoGallery.findMany()
    } catch (e) {
        console.error('Error fetching videos:', e)
        throw new Error('Failed to fetch videos.')
    }

}


export async function fetchVideoById(id: string) {
    noStore()
    try {
        return await prisma.videoGallery.findUnique({where: {id}, include: {type: true}})
    } catch (e) {
        console.error('Error fetching video by that id:', e)
        throw new Error('Failed to fetch video by given id.')
    }

}
