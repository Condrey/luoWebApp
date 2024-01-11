"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import { ServerMessage } from "@/lib/utils";
import {
  createTopicSchema,
  CreateTopicSchema,
  deleteTopicSchema,
  UpdateTopicSchema,
  updateTopicSchema,
} from "@/lib/db/validation/topic";

export async function createTopic(
  formData: CreateTopicSchema,
): Promise<ServerMessage> {
  //Validate form fields using Zod
  const parseResult = createTopicSchema.safeParse(formData);
  //If form validation occurs, return errors early, otherwise, proceed.
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message: "Missing fields. Failed to create topic.",
    };
  }
  //Prepare data for insertion into the database
  const { title } = parseResult.data;

  ("use server");
  const { userId } = auth();

  //Check if user is permitted to perform this action
  if (!userId) {
    console.error("Not authorized");
    return {
      type: "warning",
      message: "You are unauthorized to perform this action.",
    };
  }
  // Insert data into the database
  try {
    await prisma.topic.create({
      data: {
        title,
        authorId: userId,
      },
    });
  } catch (e) {
    //If a database error occurs, return a more specific error.
    console.error(e);
    return {
      type: "error",
      message: "Database error: Failed to add topic.",
    };
  }

  return {
    type: "success",
    title: "Hooray.!",
    message: "Successfully created topic for discussion",
  };
}

export async function updateTopic(
  formData: UpdateTopicSchema,
): Promise<ServerMessage> {
  const parseResult = updateTopicSchema.safeParse(formData);
  if (!parseResult.success) {
    console.error("Form Data:", formData);
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message: "Missing fields. Failed to update topic.",
    };
  }

  const { title, id } = parseResult.data;
  const topic = await prisma.topic.findUnique({ where: { id } });
  if (!topic) {
    return { message: "Topic not found", type: "error", title: "404" };
  }

  ("use server");
  const { userId, user } = auth();
  const isAdmin = userId === "user_2YtZKRrHz7XhlJ1U2qNZnKidhGC";
  if (!userId || (userId !== topic.authorId && !isAdmin)) {
    console.error("Not authorized");

    return {
      message: "User not authorized to perform action",
      type: "warning",
    };
  }

  try {
    await prisma.topic.update({
      where: { id },
      data: {
        title,
      },
    });
  } catch (e) {
    console.error(e);
    return {
      message: "Database Error: Failed to Update Topic.",
      type: "error",
    };
  }
  return {
    type: "success",
    title: "Done.!",
    message: "Successfully edited Topic",
  };
}

export async function deleteTopic(
  formData: CreateTopicSchema,
): Promise<ServerMessage> {
  const parseResult = deleteTopicSchema.safeParse(formData);
  if (!parseResult.success) {
    console.error(parseResult.error);
    return {
      errors: JSON.stringify(parseResult.error.flatten().fieldErrors),
      type: "error",
      message: "Missing fields. Failed to delete topic.",
    };
  }
  const { id } = parseResult.data;
  const topic = await prisma.topic.findUnique({ where: { id } });
  if (!topic) {
    return {
      message: "Topic not found",
      type: "error",
    };
  }

  ("use server");
  const { userId } = auth();

  if (
    !userId ||
    (userId !== topic.authorId && userId !== "user_2YtZKRrHz7XhlJ1U2qNZnKidhGC")
  ) {
    console.error(`Not authorized`);
    return {
      message: `User not authorized to perform action.`,
      type: "warning",
    };
  }
  try {
    await prisma.topic.delete({ where: { id } });
    return { message: "Topic deleted.!", type: "success", title: "Success.!" };
  } catch (e) {
    console.error(e);
    return {
      message: "Database Error: Failed to Delete Topic.",
      type: "error",
    };
  }
}
