import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db/prisma";
import { clerkClient } from "@clerk/nextjs";
import { formatDateToLocal } from "@/lib/utils";

export async function fetchRepliesWithTopic() {
  noStore();
  try {
    const data = await prisma.topicComment.findMany({
      include: { Topic: true },
    });

    return await Promise.all(
      data.map(async (item) => {
        const user = await clerkClient.users.getUser(item.authorId);
        const wasUpdated = item.updatedAt > item.createdAt;
        const createdUpdatedAtTimestamp = wasUpdated
          ? item.updatedAt
          : item.createdAt;
        return {
          ...item,
          imageUrl: user.imageUrl,
          userName:
            user.firstName ||
            user.emailAddresses[0].emailAddress ||
            user.lastName ||
            "",
          createdUpdatedAtTimestamp: `${formatDateToLocal(
            createdUpdatedAtTimestamp,
          )} ${wasUpdated ? " (edited)" : ""} `,
        };
      }),
    );
  } catch (e) {
    console.error("Error fetching replies with topic:", e);
    throw new Error("Failed to fetch replies with topic.");
  }
}
