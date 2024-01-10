import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { fetchTopics } from "@/lib/db/data/topic-data";
import EditTopicButton from "@/app/(homeNavBarPages)/grievances/chat/edit-topic-button";

export default async function Page() {
  const topics = await fetchTopics();
  return (
    <>
      <span>{`List of Topics (${topics.length.toLocaleString()})`}</span>
      <div className="flex flex-col gap-4">
        {topics.map((topic) => (
          <div key={topic.id} className="p-3 border rounded-md max-w-2xl ">
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src={topic.imageUrl} />
                <AvatarFallback>
                  {topic.userName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col grow">
                <span className="text-sm">{topic.userName}</span>
                <span className="text-xs">
                  {topic.createdUpdatedAtTimestamp}
                </span>
              </div>
              <div>
                <EditTopicButton
                  topicToEditJsonString={JSON.stringify(topic)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className=" font-bold">{topic.title}</span>
              <span>{topic.numberOfComments}</span>
              <span>{`${topic.numberOfLikes} likes`}</span>
              <span>{`${topic.numberOfDisLikes} dislikes`}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
