import {fetchTopics} from "@/lib/db/data/topic-data";
import {currentUser} from "@clerk/nextjs";
import TopicContainer from "@/app/(homeNavBarPages)/grievances/chat/topic-container";

export default async function Comments() {
    const user = await currentUser()
    const topics = await fetchTopics()
    return <div className=' p-3 gap-3 flex flex-col'>
        {
            topics.map((topic) =>
                <TopicContainer key={topic.id} topic={topic} userName={topic.userName} imageUrl={topic.imageUrl}
                                createdUpdatedAtTimestamp={topic.createdUpdatedAtTimestamp} userId={user?.id}
                                numberOfComments={topic.numberOfComments} numberOfDislikes={topic.numberOfDisLikes}
                                numberOfLikes={topic.numberOfLikes}/>
            )
        }
    </div>
}
export const metadata = {
    title: `Grievances: Share thoughts and experiences`
}


/**
 *   <br/> Comments
 *         <br/> A platform for visitors to share their thoughts and experiences.
 *         <br/> Moderation features to ensure respectful and constructive discussions.
 *         <br/> Reply option for community interaction.
 */
