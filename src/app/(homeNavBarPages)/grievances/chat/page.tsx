import { fetchTopics } from "@/lib/db/data/topic-data";
import { currentUser } from "@clerk/nextjs";
import TopicContainer from "@/app/(homeNavBarPages)/grievances/chat/topic-container";
import Breadcrumbs from "@/components/ui/bread-crumb";
import AddTopicButton from "@/app/(homeNavBarPages)/grievances/chat/AddTopicButton";

export default async function Comments() {
  const user = await currentUser();
  const topics = await fetchTopics();

  return (
    <div className=" p-4 md:p-6 gap-3 flex flex-col">
      <div className="flex justify-between items-center gap-2 ">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Grievances", href: "/grievances" },
            {
              label: "Chats",
              href: "/grievances/chats",
            },
          ]}
        />
        <div className="mb-6">
          <AddTopicButton />
        </div>
      </div>

      <div className="gap-4 md:gap-6 flex flex-col">
        {topics.map((topic) => {
          const userLikeOrDislike = topic.userLikesOrDislikes.filter(
            (item) => item.topicId === topic.id,
          );
          return (
            <>
              <TopicContainer
                key={topic.id}
                topic={topic}
                userName={topic.userName}
                imageUrl={topic.imageUrl}
                createdUpdatedAtTimestamp={topic.createdUpdatedAtTimestamp}
                userId={user?.id}
                numberOfComments={topic.numberOfComments}
                numberOfDislikes={topic.numberOfDisLikes}
                numberOfLikes={topic.numberOfLikes}
                userLikeOrDislike={userLikeOrDislike[0]!}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
export const metadata = {
  title: `Grievances: Share thoughts and experiences`,
};

/**
 *   <br/> Comments
 *         <br/> A platform for visitors to share their thoughts and experiences.
 *         <br/> Moderation features to ensure respectful and constructive discussions.
 *         <br/> Reply option for community interaction.
 */
