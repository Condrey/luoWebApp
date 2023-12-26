import {fetchTopics} from "@/lib/db/data/topic-data";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default async function Comments() {
    const topics = await fetchTopics()
    return <div className='space-4'>
        {
            topics.map((topic) => (
                <div key={topic.id} className='border rounded-md p-3 flex gap-2 '>
                    <Avatar>
                        <AvatarImage src={topic.user.imageUrl}/>
                        <AvatarFallback>{topic.user.firstName?.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                        <span>{topic.title}</span>
                        <span>{topic.createdUpdatedAtTimestamp}</span>
                    </div>
                </div>
            ))
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
