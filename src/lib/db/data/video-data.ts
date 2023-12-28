import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";


export async function fetchVideosCount() {
    noStore()
    try {
        return await prisma.videoGallery.count()
    } catch (e) {
        console.error('Error fetching videos count:', e)
        throw new Error('Failed to fetch videos count.')
    }

}

export async function fetchVideosCountByPlaylistId(playlistId: string) {
    noStore()
    try {
        return await prisma.videoGallery.count({where: {categoryId: playlistId}})
    } catch (e) {
        console.error('Error fetching videos count:', e)
        throw new Error('Failed to fetch videos count.')
    }

}

export async function fetchVideos() {
    noStore()
    try {
        return await prisma.videoGallery.findMany({include: {type: true}})
    } catch (e) {
        console.error('Error fetching videos:', e)
        throw new Error('Failed to fetch videos.')
    }

}

export async function fetchVideosByNumber(limit: number) {
    noStore()
    try {
        return await prisma.videoGallery.findMany({take: limit, include: {type: true}})
    } catch (e) {
        console.error('Error fetching videos by limit:', e)
        throw new Error('Failed to fetch videos by videos.')
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

export async function fetchVideoByIdWithPlaylistAndVideos(id: string) {
    noStore()
    try {
        return await prisma.videoGallery.findUnique({
            where: {id},
            include: {type: {include: {videoGalleries: {include: {type: true}}}}}
        })

    } catch (e) {
        console.error('Error fetching video by that id:', e)
        throw new Error('Failed to fetch video by given id.')
    }

}

export async function fetchVideosByPlayListId(id: string) {
    noStore()
    try {
        return await prisma.videoGallery.findMany({where: {videoGalleryDescriptionId: id}, include: {type: true}})

    } catch (e) {
        console.error('Error fetching videos by that id:', e)
        throw new Error('Failed to fetch video by given id.')
    }

}
