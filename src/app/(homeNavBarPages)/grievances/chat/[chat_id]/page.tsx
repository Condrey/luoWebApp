import {fetchUniqueTopic} from "@/lib/db/data/topic-data";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DialogFooter} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {LucideReply, LucideThumbsDown, LucideThumbsUp} from "lucide-react";
import EditTopicButton from "@/app/(homeNavBarPages)/grievances/chat/edit-topic-button";
import CommentForm from "@/app/(homeNavBarPages)/grievances/chat/[chat_id]/comment-form";
import Breadcrumbs from "@/components/ui/bread-crumb";
import {currentUser} from "@clerk/nextjs";
import EditCommentButton from "@/app/(homeNavBarPages)/grievances/chat/[chat_id]/edit-comment-button";

export default async function Page({params}: { params: { chat_id: string } }) {
    const user = await currentUser()
    const topic = await fetchUniqueTopic(params.chat_id)
    const createdUpdatedAtTimestamp = topic?.createdUpdatedAtTimestamp
    const numberOfLikes = topic?.numberOfLikes
    const numberOfComments = topic?.numberOfComments
    const numberOfDislikes = topic?.numberOfDisLikes
    const topicComments = topic?.wholeComments
    return <div className='flex flex-col    pt-1 gap-4'>
        <Breadcrumbs breadcrumbs={[
            {label: 'Grievances', href: '/grievances'},
            {label: 'Chat', href: '/grievances/chat'},
            {label: 'current topic', href: `/grievances/chat/${params.chat_id}`},
        ]}/>
        <div className='flex flex-col justify-between   grow  pt-1 gap-12'>
            <div id='topic' className='sticky top-0 px-1 bg-accent dark:bg-background z-40'>
                <div
                    className='border rounded-md p-3 flex gap-2 bg-gradient-to-br from-amber-500/20 dark:from-slate-800 to-background border-amber-500 dark:border-border'
                >
                    <Avatar>
                        <AvatarImage src={topic!.imageUrl}/>
                        <AvatarFallback>{topic!.userName?.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1 grow'>
                        <span className='text-sm'>{topic!.title}</span>
                        <span
                            className='text-xs text-slate-700 '>{`${topic!.userName} - ${createdUpdatedAtTimestamp}`}</span>
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
                            <div className={cn(topic!.authorId !== user?.id && 'hidden')}>
                                <EditTopicButton topicToEditJsonString={JSON.stringify(topic)}/>
                            </div>
                        </DialogFooter>
                    </div>
                </div>
            </div>
            <div id='discussions' className='grow px-1 overflow-y-auto flex flex-col gap-6  '>
                <span
                    className={cn('text-2xl font-bold text-center', topicComments?.length === 0 && 'hidden')}>Replies</span>
                <div className='flex flex-col gap-3'>
                    {
                        topicComments?.map((topicComment) => {
                            return <div key={topicComment.id}
                                        className={cn('flex', topicComment!.authorId === user?.id ? 'justify-end' : 'justify-start')}>
                                <div
                                    className={cn('w-9/12  border rounded-md p-3 flex gap-2 bg-gradient-to-bl from-amber-500/20 dark:from-slate-800 to-background border-amber-500 dark:border-border ',
                                        topicComment!.authorId === user?.id && ' bg-gradient-to-br flex-row-reverse from-transparent border-border border-2  dark:from-transparent')}
                                >
                                    <Avatar>
                                        <AvatarImage src={topicComment!.imageUrl}/>
                                        <AvatarFallback>{topicComment!.userName?.substring(0, 1)}</AvatarFallback>
                                    </Avatar>

                                    <div className='flex flex-col gap-1 grow'>
                                        <span className='text-sm'>{topicComment!.comment}</span>
                                        <span
                                            className='text-xs text-slate-700 '>{`${topicComment.userName} - ${topicComment.createdUpdatedAtTimestamp}`}</span>
                                        <DialogFooter>
                                            <div className={cn(topicComment!.authorId !== user?.id && 'hidden')}>
                                                <EditCommentButton
                                                    commentToEditJsonString={JSON.stringify(topicComment)}/>
                                            </div>
                                        </DialogFooter>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
            <div id='reply zone'
                 className='sticky w-full bottom-0 right-0 backdrop-blur-2xl px-2 pt-2 pb-6 md:pb-12 rounded-t-md'>
                <CommentForm topicId={topic?.id}/>
            </div>
        </div>

    </div>
}
