import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";


//categories
export async function fetchPlaylists() {
    noStore()
    try {
        return await prisma.videoGalleryDescription.findMany()
    } catch (e) {
        console.error('Error fetching playlists:', e)
        throw new Error('Failed to fetch playlists.')
    }

}


export async function fetchPlaylistById(id: string) {
    noStore()
    try {
        return await prisma.videoGalleryDescription.findUnique({
            where: {id},
        })
    } catch (e) {
        console.error('Error fetching playlist with that id:', e)
        throw new Error('Failed to fetch playlist by that id.')
    }

}
