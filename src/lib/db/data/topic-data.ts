import {unstable_noStore as noStore,} from 'next/cache'
import prisma from "@/lib/db/prisma";
import {formatDateToLocal} from "@/lib/utils";
import {clerkClient} from "@clerk/nextjs";


//Petition
export async function fetchTopics() {
    noStore()
    try {
        const data = await prisma.topic.findMany({orderBy: {createdAt: 'desc'}})
        return await Promise.all(data.map(async (item) => {
            const user = await clerkClient.users.getUser(item.authorId);
            const wasUpdated = item.updatedAt > item.createdAt
            const createdUpdatedAtTimestamp = wasUpdated ? item.updatedAt : item.createdAt

            return {
                ...item,
                createdUpdatedAtTimestamp: `${formatDateToLocal(createdUpdatedAtTimestamp)} ${wasUpdated ? ' (updated)' : ''} `,
                user: user
            };
        }));
    } catch (e) {
        console.error('Error fetching petitions:', e)
        throw new Error('Failed to fetch petitions.')
    }

}
