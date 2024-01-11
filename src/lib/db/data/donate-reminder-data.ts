import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

export async function fetchHasUserSentDonateReminder() {
  noStore();
  try {
    const { userId } = await auth();
    const result = await prisma.donateReminder.count({ where: { userId:userId! as string } });
    return result > 0;
  } catch (e) {
    console.error("Error occurred:", e);
    throw new Error("Failed to execute request.");
  }
}
