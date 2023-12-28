import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";
import {clerkClient} from "@clerk/nextjs";
import {formatDateToLocal} from "@/lib/utils";


export async function fetchQuotations() {
    noStore()
    try {
        const data = await prisma.quotations.findMany({orderBy: {createdAt: 'desc'}})
        return await Promise.all(data.map(async (quotation) => {
            const user = await clerkClient.users.getUser(quotation.authorId);

            const wasUpdated = quotation.updatedAt > quotation.createdAt
            const createdUpdatedAtTimestamp = wasUpdated ? quotation.updatedAt : quotation.createdAt

            return {
                ...quotation,
                createdUpdatedAtTimestamp: `${formatDateToLocal(createdUpdatedAtTimestamp)} ${wasUpdated ? ' (updated)' : ''} `,
                userName: user.firstName || user.emailAddresses[0].emailAddress || 'Unknown',
                imageUrl: user.imageUrl
            };
        }));
    } catch (e) {
        console.error('Error fetching quotations:', e)
        throw new Error('Failed to fetch quotations.')
    }

}

export async function fetchQuotationsByNumber(limit: number) {
    noStore()
    try {
        const data = await prisma.quotations.findMany({orderBy: {createdAt: 'desc'}, take: limit})
        return await Promise.all(data.map(async (quotation) => {
            const user = await clerkClient.users.getUser(quotation.authorId);

            const wasUpdated = quotation.updatedAt > quotation.createdAt
            const createdUpdatedAtTimestamp = wasUpdated ? quotation.updatedAt : quotation.createdAt

            return {
                ...quotation,
                createdUpdatedAtTimestamp: `${formatDateToLocal(createdUpdatedAtTimestamp)} ${wasUpdated ? ' (updated)' : ''} `,
                userName: user.firstName || user.emailAddresses[0].emailAddress || 'Unknown',
                imageUrl: user.imageUrl
            };
        }));
    } catch (e) {
        console.error('Error fetching quotations:', e)
        throw new Error('Failed to fetch quotations.')
    }

}
