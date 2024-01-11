"use client";
import { cn } from "@/lib/utils";
import { LucideThumbsUp } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createLikeOrDislikeSchema,
  CreateLikeOrDislikeSchema,
} from "@/lib/db/validation/like-or-dislike";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {
  createLikeOdDislike,
  updateLikeOrDislike,
} from "@/lib/db/actions/like-or-dislike-action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { TopicLikeOrDisLike } from "@prisma/client";

export default function LikeButton({
  numberOfLikes,
  topicId,
  userLikeOrDislike,
}: {
  numberOfLikes: string;
  topicId: string;
  userLikeOrDislike: TopicLikeOrDisLike;
}) {
  const router = useRouter();
  const form = useForm<CreateLikeOrDislikeSchema>({
    resolver: zodResolver(createLikeOrDislikeSchema),
    defaultValues: {
      topicId: topicId,
      likeOrDislike: "LIKE",
    },
  });

  async function onSubmit(input: CreateLikeOrDislikeSchema) {
    try {
      if (userLikeOrDislike) {
        const response = await updateLikeOrDislike({
          ...input,
          id: userLikeOrDislike.id,
        });
        toast({
          title: response.title!,
          description: response.message,
          variant: response.type === "error" ? "destructive" : "default",
        });
      } else {
        const response = await createLikeOdDislike(input);
        toast({
          title: response.title!,
          description: response.message,
          variant: response.type === "error" ? "destructive" : "default",
        });
      }
    } catch (e) {
      toast({
        title: "An error occurred",
        description: "Try again.!",
        variant: "destructive",
      });
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl></FormControl>
            </FormItem>
          )}
          name={"topicId"}
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl></FormControl>
            </FormItem>
          )}
          name={"likeOrDislike"}
          control={form.control}
        />
        <LoadingButton
          variant="ghost"
          className={cn(`flex items-end gap-1 cursor-pointer`)}
          loading={form.formState.isSubmitting}
          type={"submit"}
        >
          <span>{numberOfLikes}</span>
          {userLikeOrDislike !== undefined ? (
            <LucideThumbsUp
              className={cn(
                userLikeOrDislike.likeOrDislike === "LIKE" &&
                  "text-amber-500 dark:text-amber-300",
              )}
            />
          ) : (
            <LucideThumbsUp />
          )}
        </LoadingButton>
      </form>
    </Form>
  );
}
