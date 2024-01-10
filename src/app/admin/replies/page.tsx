import { fetchRepliesWithTopic } from "@/lib/db/data/replies-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditCommentButton from "@/app/(homeNavBarPages)/grievances/chat/[chat_id]/edit-comment-button";

export default async function Page() {
  const replies = await fetchRepliesWithTopic();
  return (
    <>
      <span>{`List of replies (${replies.length.toLocaleString()})`}</span>
      <div className="max-w-2xl gap-4 flex flex-col">
        {replies.map((reply) => (
          <div key={reply.id} className="border rounded-md p-3">
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src={reply.imageUrl} />
                <AvatarFallback>
                  {reply.userName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col grow">
                <span className="text-sm">{reply.userName}</span>
                <span className="text-xs">
                  {reply.createdUpdatedAtTimestamp}
                </span>
              </div>
              <div>
                <EditCommentButton
                  commentToEditJsonString={JSON.stringify(reply)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className='before:content-["Topic:_"] before:font-bold'>
                {reply.Topic!.title}
              </span>
              <span className='before:content-["Reply:_"] before:font-bold'>
                {reply.comment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
