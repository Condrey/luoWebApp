import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";
import {clerkClient} from '@clerk/nextjs'
import {Quotations} from ".prisma/client";

export async function populateGrievancesCounter() {
    noStore()
    try {
        const quotesCountPromise = prisma.quotations.count()
        const videosCountPromise = prisma.videoGallery.count()
        const playlistCountPromise = prisma.videoGalleryDescription.count()
        const chatCountPromise = prisma.topic.count()
        const chatReplyCountPromise = prisma.topicComment.count()
        const favoriteQuotePromise = prisma.quotations.findFirst()


        const data = await Promise.all([
            quotesCountPromise, videosCountPromise, playlistCountPromise, chatCountPromise, chatReplyCountPromise, favoriteQuotePromise
        ])
        const numberOfQuotes = Number(data[0] ?? '0')
        const numberOfVideos = Number(data[1] ?? '0')
        const numberOfPlaylists = Number(data[2] ?? '0')
        const numberOfTopics = Number(data[3] ?? '0')
        const numberOfTopicReplies = Number(data[4] ?? '0')
        const favoriteQuote: Quotations | null = data[5]
        if (!favoriteQuote) {
            throw new Error('Favorite quote not found.');
        }
        const user = await clerkClient.users.getUser(favoriteQuote!.authorId)

        return {
            numberOfQuotes: numberOfQuotes.toLocaleString(),
            numberOfVideos: numberOfVideos.toLocaleString(),
            numberOfPlaylists: numberOfPlaylists.toLocaleString(),
            numberOfTopics: `${numberOfTopics.toLocaleString()} Discussion${numberOfTopics === 1 ? '' : 's'}`,
            numberOfTopicReplies: `${numberOfTopicReplies.toLocaleString()} ${numberOfTopicReplies === 1 ? 'reply' : 'Replies'}`,
            favoriteQuote: {
                ...favoriteQuote,
                userName: user.firstName || user.emailAddresses[0].emailAddress || 'Unknown'
            }
        }
    } catch (e) {
        console.error('Error determining request:', e)
        throw new Error('Failed to determine request.')
    }

}
