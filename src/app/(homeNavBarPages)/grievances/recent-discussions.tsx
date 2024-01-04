import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { fetchTopics } from "@/lib/db/data/topic-data";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LucideReply, LucideThumbsDown, LucideThumbsUp } from "lucide-react";
import Link from "next/link";
import EditTopicButton from "@/app/(homeNavBarPages)/grievances/chat/edit-topic-button";
import { currentUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export default async function RecentDiscussions() {
  const user = await currentUser();
  const userId = user?.id;
  const discussions = await fetchTopics();

  return (
    <div className="flex flex-col gap-3 bg-background h-full rounded-md p-3 md:border">
      <span className="text-xl md:text-2xl   flex justify-center">
        Recent Discussions
      </span>
      <div className="flex flex-col gap-4">
        {discussions.map((discussion) => {
          return (
            <Link
              href={`/grievances/chat/${discussion.id}`}
              key={discussion.id}
              className="flex flex-col drop-shadow-md gap-2 border rounded-md p-3 bg-accent hover:bg-accent/50 text-accent-foreground cursor-pointer"
            >
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={discussion.imageUrl} />
                </Avatar>
                <div className="flex flex-col  dark:text-slate-500">
                  <span className="text-sm">{discussion.userName}</span>
                  <span className="text-xs">
                    -{discussion.createdUpdatedAtTimestamp}
                  </span>
                </div>
              </div>
              <span>{discussion.title}</span>
              <DialogFooter className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 items-center grow justify-center">
                  <span
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      `flex items-end gap-1 cursor-pointer`,
                    )}
                  >
                    <span>{discussion.numberOfLikes}</span> <LucideThumbsUp />
                  </span>
                  <div
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      `flex items-end gap-1 cursor-pointer`,
                    )}
                  >
                    <LucideThumbsDown />
                    <span>{discussion.numberOfDisLikes}</span>
                  </div>
                  <span className={cn(" flex items-end gap-1 text-slate-700")}>
                    <LucideReply />
                    <span>{discussion.numberOfComments}</span>
                  </span>
                </div>
                <Link
                  href={`/grievances/chat/${discussion.id}`}
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Join
                </Link>
                <div className={cn(discussion.authorId !== userId && "hidden")}>
                  <EditTopicButton
                    topicToEditJsonString={JSON.stringify(discussion)}
                  />
                </div>
              </DialogFooter>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function RecentDiscussionsSkeleton() {
  return (
    <>
      <span className="text-xl md:text-2xl   flex justify-center">
        Recent Discussions
      </span>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }, (_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col drop-shadow-md gap-2 border rounded-md p-3  w-[300px] cursor-pointer"
            >
              <div className="flex gap-4">
                <Skeleton className="size-[80px] rounded-full" />
                <div className="flex flex-col  dark:text-slate-500">
                  <Skeleton className="w-2/3 h-1" />
                  <Skeleton className="w-1/2 h-1.5" />
                </div>
              </div>
              <Skeleton className="w-12 h-4" />
              <DialogFooter className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 items-center grow justify-center">
                  <Skeleton className="w-5/12 h-4" />
                  <Skeleton className="w-5/12 h-4" />
                  <Skeleton className="w-5/12 h-4" />
                </div>
                <Skeleton className="w-4/12 h-4" />
                <Skeleton className="w-4/12 h-4" />
              </DialogFooter>
            </div>
          );
        })}
      </div>
    </>
  );
}
