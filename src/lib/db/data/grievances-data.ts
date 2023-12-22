import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";


export async function populateGrievancesCounter() {
    noStore()
    try {
        const quotesCountPromise = prisma.quotations.count()
        const videosCountPromise = prisma.videoGallery.count()
        const playlistCountPromise = prisma.videoGalleryDescription.count()
        const chatCountPromise = prisma.topic.count()
        const chatReplyCountPromise = prisma.topicComment.count()

        const data = await Promise.all([
            quotesCountPromise, videosCountPromise, playlistCountPromise, chatCountPromise, chatReplyCountPromise
        ])
        const numberOfQuotes = Number(data[0] ?? '0')
        const numberOfVideos = Number(data[1] ?? '0')
        const numberOfPlaylists = Number(data[2] ?? '0')
        const numberOfTopics = Number(data[3] ?? '0')
        const numberOfTopicReplies = Number(data[4] ?? '0')
        return {
            numberOfQuotes: numberOfQuotes.toLocaleString(),
            numberOfVideos: numberOfVideos.toLocaleString(),
            numberOfPlaylists: numberOfPlaylists.toLocaleString(),
            numberOfTopics: `${numberOfTopics.toLocaleString()} Discussion${numberOfTopics === 1 ? '' : 's'}`,
            numberOfTopicReplies: `${numberOfTopicReplies.toLocaleString()} Replie${numberOfTopicReplies === 1 ? '' : 's'}`,
        }
    } catch (e) {
        console.error('Error determining request:', e)
        throw new Error('Failed to determine request.')
    }

}
