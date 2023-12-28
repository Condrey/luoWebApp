import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DialogFooter} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {LucideReply, LucideThumbsDown, LucideThumbsUp} from "lucide-react";
import EditTopicButton from "@/app/(homeNavBarPages)/grievances/chat/edit-topic-button";
import {Topic} from "@prisma/client";
import Link from "next/link";

interface TopicContainerProps {
    topic: Topic,
    userName: string,
    imageUrl: string,
    createdUpdatedAtTimestamp: string,
    userId: string | undefined,
    numberOfComments: string,
    numberOfLikes: string,
    numberOfDislikes: string
}

export default function TopicContainer({
                                           topic,
                                           userName, imageUrl,
                                           createdUpdatedAtTimestamp,
                                           userId,
                                           numberOfLikes,
                                           numberOfDislikes,
                                           numberOfComments
                                       }: TopicContainerProps) {
    return <div
        className='border rounded-md p-3 flex gap-2 bg-gradient-to-br from-amber-500/20 dark:from-slate-800 to-background border-amber-500 dark:border-border'>
        <Avatar>
            <AvatarImage src={imageUrl}/>
            <AvatarFallback>{userName?.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 grow'>
            <span className='text-sm'>{topic.title}</span>
            <span
                className='text-xs text-slate-700 '>{`${userName} - ${createdUpdatedAtTimestamp}`}</span>
            <DialogFooter className='flex items-center justify-between gap-3'>
                <div className='flex gap-2 items-center grow justify-center'>
                                <span
                                    className={cn(buttonVariants({variant: 'ghost'}), `flex items-end gap-1 cursor-pointer`)}>
                                                     <span>{numberOfLikes}</span>       <LucideThumbsUp/>

                            </span>
                    <div
                        className={cn(buttonVariants({variant: 'ghost'}), `flex items-end gap-1 cursor-pointer`)}>
                        <LucideThumbsDown/><span>{numberOfDislikes}</span>
                    </div>
                    <span
                        className={cn(' flex items-end gap-1 text-slate-700')}>
                                                            <LucideReply/><span>{numberOfComments}</span>

                            </span>
                </div>
                <Link href={`/grievances/chat/${topic.id}`}
                      className={buttonVariants({variant: 'destructive'})}>Join</Link>
                <div className={cn(topic.authorId !== userId && 'hidden')}>
                    <EditTopicButton topicToEditJsonString={JSON.stringify(topic)}/>
                </div>
            </DialogFooter>
        </div>
    </div>

}
