import {unstable_noStore as noStore} from "next/cache";
import prisma from "@/lib/db/prisma";
import {formatDateToLocal} from "@/lib/utils";
import {clerkClient, currentUser} from "@clerk/nextjs";

//Petition
export async function fetchPetitions() {
  noStore();
  try {
    const data = await prisma.petition.findMany({
      where: { showDetails: true },
      orderBy: { createdAt: "desc" },
      take: 9,
    });
    return await Promise.all(
      data.map(async (petition) => {
        const user = await clerkClient.users.getUser(petition.userId);
        return {
          ...petition,
          createdAtTime: formatDateToLocal(petition.createdAt),
          district: `${petition.district} district/ city`,
          user: user,
          userName:
            user.username ||
            user.firstName ||
            user.emailAddresses[0].emailAddress ||
            "",
          imageUrl: user.imageUrl,
        };
      }),
    );
  } catch (e) {
    console.error("Error fetching petitions:", e);
    throw new Error("Failed to fetch petitions.");
  }
}

export async function fetchPetitionNumber() {
  noStore();
  try {
    return await prisma.petition.count();
  } catch (e) {
    console.error("Error fetching petition number:", e);
    throw new Error("Failed to fetch petition number.");
  }
}

export async function fetchPetitionStatistics() {
  try {
    const totalPetition = await prisma.petition.count();
    const query = await prisma.petition.groupBy({
      by: ["district"],
      _count: {
        district: true,
      },
      orderBy: {
        _count: {
          district: "desc",
        },
      },

      take: 5,
    });

    // console.log(result)
    return query.map((item) => {
      return {
        ...item,
        percentage: `${((item._count.district / totalPetition) * 100).toFixed(
          1,
        )}% 
• ${item._count.district.toLocaleString()}/${totalPetition.toLocaleString()} `,
        number: `${item._count.district.toLocaleString()} petition signature${
          item._count.district === 1 ? "" : "s"
        }`,
      };
    });
  } catch (error) {
    console.error("Error fetching petition statistics:", error);
    throw new Error("Failed to fetch petition stats.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchPetitionByUserId(id: string) {
  noStore();
  try {
    return await prisma.petition.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Error fetching petition by that id:", e);
    throw new Error("Failed to fetch petition by given id.");
  }
}

export async function hasUserSignedPetition() {
  noStore();

  try {
    const user = await currentUser();
    return (await prisma.petition.count({ where: { userId: user?.id } })) >= 1;
  } catch (e) {
    console.error("Error determining request:", e);
    throw new Error("Failed to determine request.");
  }
}

export async function populateCounter() {
  noStore();
  try {
    const petitionCountPromise = prisma.petition.count();
    const videosCountPromise = prisma.videoGallery.count();
    const playlistCountPromise = prisma.videoGalleryDescription.count();
    const chatCountPromise = prisma.topic.count();
    const quotationCountPromise = prisma.quotations.count();

    const data = await Promise.all([
      petitionCountPromise,
      videosCountPromise,
      playlistCountPromise,
      chatCountPromise,
      quotationCountPromise,
    ]);
    const numberOfPetitions = Number(data[0] ?? "0");
    const numberOfVideos = Number(data[1] ?? "0");
    const numberOfPlaylists = Number(data[2] ?? "0");
    const numberOfTopics = Number(data[3] ?? "0");
    const numberOfQuotes = Number(data[4] ?? "0");
    return {
      numberOfPetitions,
      numberOfVideos,
      numberOfPlaylists,
      numberOfTopics,
      numberOfQuotes,
    };
  } catch (e) {
    console.error("Error determining request:", e);
    throw new Error("Failed to determine request.");
  }
}

//       await new Promise((resolve) => setTimeout(resolve, 10000));
