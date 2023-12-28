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

export async function fetchPlaylistsWithVideos() {
    noStore()
    try {
        return await prisma.videoGalleryDescription.findMany(
            {
                include: {videoGalleries: true}
            }
        )
    } catch (e) {
        console.error('Error fetching playlists with videos:', e)
        throw new Error('Failed to fetch playlists with videos.')
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

export async function fetchPlaylistByIdWithVideos(id: string) {
    noStore()
    try {
        return await prisma.videoGalleryDescription.findUnique({
            where: {id}, include: {videoGalleries: {include: {type: true}}}
        })
    } catch (e) {
        console.error('Error fetching playlist with that id:', e)
        throw new Error('Failed to fetch playlist by that id.')
    }

}
