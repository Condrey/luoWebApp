import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db/prisma";
import { formatDateToLocal } from "@/lib/utils";
import { clerkClient, currentUser } from "@clerk/nextjs";

export async function fetchTopics() {
  noStore();
  try {
    const data = await prisma.topic.findMany({
      include: { topicLikeOrDisLikes: true, comments: true },
      orderBy: { createdAt: "desc" },
    });
    return await Promise.all(
      data.map(async (item) => {
        const user = await clerkClient.users.getUser(item.authorId);
        const thisUser = await currentUser();
        const numberOfComments = item.comments.length;
        const numberOfLikes =
          item.topicLikeOrDisLikes.filter(
            (value) => value.likeOrDislike === "LIKE",
          ).length || 0;
        const numberOfDisLikes =
          item.topicLikeOrDisLikes.filter(
            (value) => value.likeOrDislike === "DISLIKE",
          ).length || 0;
        const wasUpdated = item.updatedAt > item.createdAt;
        const createdUpdatedAtTimestamp = wasUpdated
          ? item.updatedAt
          : item.createdAt;
        const userLikesOrDislikes = item.topicLikeOrDisLikes.filter(
          (value) => value.authorId === thisUser?.id,
        );

        return {
          ...item,
          userLikesOrDislikes,
          createdUpdatedAtTimestamp: `${formatDateToLocal(
            createdUpdatedAtTimestamp,
          )} ${wasUpdated ? " (edited)" : ""} `,
          userName: user.firstName || user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
          numberOfComments: `${numberOfComments} ${
            numberOfComments === 1 ? "reply" : "replies"
          }`,
          numberOfLikes: numberOfLikes.toLocaleString(),
          numberOfDisLikes: numberOfDisLikes.toLocaleString(),
        };
      }),
    );
  } catch (e) {
    console.error("Error fetching petitions:", e);
    throw new Error("Failed to fetch petitions.");
  }
}

export async function fetchUniqueTopic(id: string) {
  noStore();
  try {
    const data = await prisma.topic.findUnique({
      where: { id },
      include: {
        topicLikeOrDisLikes: true,
        comments: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!data) {
      return;
    }
    const user = await clerkClient.users.getUser(data.authorId);
    const numberOfComments = data.comments.length;
    const numberOfLikes =
      data.topicLikeOrDisLikes.filter((value) => value.likeOrDislike === "LIKE")
        .length || 0;
    const numberOfDisLikes =
      data.topicLikeOrDisLikes.filter(
        (value) => value.likeOrDislike === "DISLIKE",
      ).length || 0;
    const wasUpdated = data.updatedAt > data.createdAt;
    const createdUpdatedAtTimestamp = wasUpdated
      ? data.updatedAt
      : data.createdAt;
    const wholeComments = await Promise.all(
      data.comments.map(async (item) => {
        const commentUser = await clerkClient.users.getUser(item.authorId);
        const wasUpdated = item.updatedAt > item.createdAt;
        const createdUpdatedAtTimestamp = wasUpdated
          ? item.updatedAt
          : item.createdAt;

        return {
          ...item,
          createdUpdatedAtTimestamp: `${formatDateToLocal(
            createdUpdatedAtTimestamp,
          )} ${wasUpdated ? " (edited)" : ""} `,
          userName:
            commentUser.firstName || commentUser.emailAddresses[0].emailAddress,
          imageUrl: commentUser.imageUrl,
        };
      }),
    );

    return {
      ...data,
      createdUpdatedAtTimestamp: `${formatDateToLocal(
        createdUpdatedAtTimestamp,
      )} ${wasUpdated ? " (edited)" : ""} `,
      userName: user.firstName || user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      numberOfComments: `${numberOfComments} ${
        numberOfComments === 1 ? "reply" : "replies"
      }`,
      numberOfLikes: numberOfLikes.toLocaleString(),
      numberOfDisLikes: numberOfDisLikes.toLocaleString(),
      wholeComments,
    };
  } catch (e) {
    console.error("Error fetching petitions:", e);
    throw new Error("Failed to fetch petitions.");
  }
}

export async function fetchTopicAndReplyNumber() {
  noStore();
  try {
    const numberOfTopics = await prisma.topic.count();
    const numberOfComments = await prisma.topicComment.count();
    return {
      numberOfTopics: `${numberOfTopics.toLocaleString()} discussion${
        numberOfTopics === 1 ? "" : "s"
      }`,
      numberOfComments: `${numberOfComments.toLocaleString()} ${
        numberOfComments === 1 ? "reply" : "replies"
      }`,
    };
  } catch (e) {
    console.error("Error fetching petitions:", e);
    throw new Error("Failed to fetch petitions.");
  }
}
