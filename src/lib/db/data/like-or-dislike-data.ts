import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

export async function fetchUniqueLikeOrDislike() {
  noStore();

  try {
    const { userId } = await auth();
    return  await prisma.topicLikeOrDisLike.findUnique({ where: { authorId:userId } });
  } catch (e) {
    console.error("Error occurred:", e);
    throw new Error("Failed to execute request.");
  }
}
