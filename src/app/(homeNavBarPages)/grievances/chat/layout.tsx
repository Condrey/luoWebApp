import Breadcrumbs from "@/components/ui/bread-crumb";
import {Button, buttonVariants} from "@/components/ui/button";
import {FlameIcon, MessageCircle, RadarIcon, StarsIcon} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import AddTopicButton from "@/app/(homeNavBarPages)/grievances/chat/AddTopicButton";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className='flex md:top-10 md:bottom-10 bottom-20 top-20 fixed flex-col  md:w-auto  xl:w-2/3 pr-2'>
            <Breadcrumbs breadcrumbs={[
                {label: 'Grievances', href: '/grievances'},
                {label: 'Chat', href: '/grievances/chat'},
            ]}/>
            <div
                className=' bg-gradient-to-r from-blue-400 to-fuchsia-400 text-slate-800 justify-between rounded-t h-[56px] items-center flex px-3'>
                <span className='md:text-2xl'>All topics</span>
                <AddTopicButton/>
            </div>
            <div className="flex h-full flex-col md:flex-row md:overflow-hidden border-fuchsia-400 border-2">
                <div
                    className="flex-grow   md:overflow-y-auto   bg-accent dark:bg-background overscroll-y-none">{children}</div>
                <div className="w-full flex-none md:w-64 hidden xl:flex">
                    <ChatSideNav/>
                </div>

            </div>
        </div>
    );
}

function ChatSideNav() {
    return <div className='flex flex-col gap-6 border-l border-fuchsia-400 w-full px-2 py-3'>
        <span className='text-2xl text-center'>Browse</span>
        <Button className='bg-fuchsia-300 text-slate-800 p-2 text-center rounded-full'>Search topics...</Button>
        <div className='flex flex-col gap-2'>
            <Link href={'/grievances/chat/'}
                  className={cn(buttonVariants({variant: "ghost"}), 'flex justify-between ')}>
                <div className='flex flex-row-reverse items-center gap-2'>All <MessageCircle/></div>
                <span>{25}</span></Link>
            <Link href={'/grievances/chat/hot'}
                  className={cn(buttonVariants({variant: "ghost"}), 'flex justify-between ')}>
                <div className='flex flex-row-reverse items-center gap-2'>Hot <FlameIcon/></div>
                <span>{25}</span></Link>
            <Link href={'/grievances/chat/new'}
                  className={cn(buttonVariants({variant: "ghost"}), 'flex justify-between ')}>
                <div className='flex flex-row-reverse items-center gap-2'>New <StarsIcon/>
                </div>
                <span>{25}</span></Link>
            <Link href={'/grievances/chat/recommended'}
                  className={cn(buttonVariants({variant: "ghost"}), 'flex justify-between ')}>
                <div className='flex flex-row-reverse items-center gap-2'>Recommended <RadarIcon/></div>
                <span>{25}</span></Link>
        </div>
        <span className='whitespace-pre-line bg-fuchsia-950/10 dark:bg-fuchsia-500/10 rounded-md p-3'>
            A platform for visitors to share their thoughts and experiences.
Moderation features to ensure respectful and constructive discussions.
Reply option for community interaction.
        </span>

    </div>
}
