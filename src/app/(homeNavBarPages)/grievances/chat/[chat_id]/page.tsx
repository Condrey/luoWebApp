import { fetchUniqueTopic } from "@/lib/db/data/topic-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideReply } from "lucide-react";
import EditTopicButton from "@/app/(homeNavBarPages)/grievances/chat/edit-topic-button";
import CommentForm from "@/app/(homeNavBarPages)/grievances/chat/[chat_id]/comment-form";
import { currentUser } from "@clerk/nextjs";
import EditCommentButton from "@/app/(homeNavBarPages)/grievances/chat/[chat_id]/edit-comment-button";
import { AutoScrollDiv } from "@/components/ui/auto-scroll-div";
import { Topic, TopicLikeOrDisLike } from "@prisma/client";
import LikeButton from "@/app/(homeNavBarPages)/grievances/chat/like-button";
import DislikeButton from "@/app/(homeNavBarPages)/grievances/chat/dislike-button";

export default async function Page({
  params,
}: {
  params: { chat_id: string };
}) {
  const user = await currentUser();
  const topic = await fetchUniqueTopic(params.chat_id);
  const createdUpdatedAtTimestamp = topic?.createdUpdatedAtTimestamp;
  const numberOfLikes = topic?.numberOfLikes;
  const numberOfComments = topic?.numberOfComments;
  const numberOfDislikes = topic?.numberOfDisLikes;
  const topicComments = topic?.wholeComments;
  const userLikeOrDislike = topic?.topicLikeOrDisLikes.filter(
    (item) => item.authorId === user?.id,
  );
  return (
    <AutoScrollDiv
      id="discussions"
      className="md:min-w-[620px]  grow px-4 md:px-6 pt-4 md:pt-6 overflow-y-auto scroll-smooth flex flex-col gap-6 absolute top-0  "
    >
      <TopicDiv
        topic={topic!}
        imageUrl={topic?.imageUrl!}
        userName={topic?.userName!}
        createdUpdatedAtTimestamp={createdUpdatedAtTimestamp!}
        numberOfDislikes={numberOfDislikes!}
        numberOfComments={numberOfComments!}
        numberOfLikes={numberOfLikes!}
        userId={user?.id!}
        userLikeOrDislike={userLikeOrDislike![0]}
      />

      <span
        className={cn(
          "text-2xl font-bold text-center",
          topicComments?.length === 0 && "hidden",
        )}
      >
        Replies
      </span>
      <div className="flex flex-col gap-3">
        {topicComments?.map((topicComment) => {
          return (
            <div
              key={topicComment.id}
              className={cn(
                "flex gap-2",
                topicComment!.authorId === user?.id
                  ? "justify-end flex-row-reverse"
                  : "justify-start",
              )}
            >
              <Avatar>
                <AvatarImage src={topicComment!.imageUrl} />
                <AvatarFallback>
                  {topicComment!.userName?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "w-9/12  border rounded-md p-3 flex gap-2 bg-gradient-to-bl from-amber-500/20 dark:from-slate-800 to-background border-amber-500 dark:border-border ",
                  topicComment!.authorId === user?.id &&
                    " bg-gradient-to-br flex-row-reverse from-transparent border-border border-2  dark:from-transparent",
                )}
              >
                <div className="flex flex-col gap-1 grow">
                  <span className="text-sm">{topicComment!.comment}</span>
                  <span className="text-xs text-slate-700 ">{`${topicComment.userName} - ${topicComment.createdUpdatedAtTimestamp}`}</span>
                  <DialogFooter>
                    <div
                      className={cn(
                        topicComment!.authorId !== user?.id && "hidden",
                      )}
                    >
                      <EditCommentButton
                        commentToEditJsonString={JSON.stringify(topicComment)}
                      />
                    </div>
                  </DialogFooter>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        id="reply zone"
        className="sticky w-full bottom-0 right-0 backdrop-blur-2xl  pt-2  md:pb-12 rounded-t-md"
      >
        <CommentForm topicId={topic?.id} />
      </div>
    </AutoScrollDiv>
  );
}

interface TopicProps {
  topic: Topic;
  imageUrl: string;
  userName: string;
  createdUpdatedAtTimestamp: string;
  numberOfDislikes: string;
  numberOfComments: string;
  numberOfLikes: string;
  userId: string;
  userLikeOrDislike: TopicLikeOrDisLike;
}

function TopicDiv({
  topic,
  imageUrl,
  userName,
  createdUpdatedAtTimestamp,
  numberOfLikes,
  userId,
  numberOfDislikes,
  numberOfComments,
  userLikeOrDislike,
}: TopicProps) {
  return (
    <div className="border rounded-md p-3 mt-[95px] md:mt-0 flex gap-2 bg-gradient-to-br from-amber-500/20 dark:from-slate-800 to-background border-amber-500 dark:border-border">
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{userName.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 grow">
        <span className="text-sm">{topic!.title}</span>
        <span className="text-xs text-slate-700 ">{`${userName} - ${createdUpdatedAtTimestamp}`}</span>
        <DialogFooter className="flex items-center justify-between gap-3">
          <div className="flex gap-2 items-center grow justify-center">
            <LikeButton
              numberOfLikes={numberOfLikes}
              topicId={topic.id}
              userLikeOrDislike={userLikeOrDislike}
            />
            <DislikeButton
              numberOfDislikes={numberOfDislikes}
              topicId={topic.id}
              userLikeOrDislike={userLikeOrDislike}
            />
            <span className={cn(" flex items-end gap-1 text-slate-700")}>
              <LucideReply />
              <span>{numberOfComments}</span>
            </span>
          </div>
          <div className={cn(topic!.authorId !== userId && "hidden")}>
            <EditTopicButton topicToEditJsonString={JSON.stringify(topic)} />
          </div>
        </DialogFooter>
      </div>
    </div>
  );
}
