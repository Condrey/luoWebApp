import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ArrowRight,
    FileVideo,
    LightbulbIcon,
    ListVideoIcon,
    LucideMic,
    LucideMic2,
    MessageCircleIcon,
    QuoteIcon,
    VideotapeIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {buttonVariants} from "@/components/ui/button";
import featureImage from '@/assets/akii_bua-desktop.jpg'
import Breadcrumbs from "@/components/ui/bread-crumb";
import {populateGrievancesCounter} from "@/lib/db/data/grievances-data";
import {Quotations} from ".prisma/client";
import RecentDiscussions, {RecentDiscussionsSkeleton} from "@/app/(homeNavBarPages)/grievances/recent-discussions";
import {Suspense} from "react";
import {cn} from "@/lib/utils";

const GrievancesPage = async () => {
    const {
        numberOfQuotes,
        numberOfTopics,
        numberOfPlaylists,
        numberOfVideos,
        numberOfTopicReplies,
        favoriteQuote
    } = await populateGrievancesCounter()
    return <main className="flex min-h-dvh flex-col gap-12 items-center p-4">
        <Breadcrumbs breadcrumbs={[
            {label: 'Grievances', href: '/grievances', active: true}
        ]}/>
        <div id='first section'
             className='max-w-prose  grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-3'>
            <GalleryCard noOfPlaylists={numberOfPlaylists} noOfVideos={numberOfVideos}/>
            <ChatCard noOfDiscussions={numberOfTopics} noOfReplies={numberOfTopicReplies}/>
            <QuoteCard noOfQuotes={numberOfQuotes}/>
        </div>
        <PopularQuoteTag quotation={favoriteQuote!} userName={favoriteQuote.userName}/>
        <div className='flex flex-col md:flex-row gap-6 md:gap-12'>
            <div className='flex flex-col w-full xl:w-2/3'>
                <SpotlightCard noOfStories={200} noOfInterviews={100}/>
            </div>
            <div className='flex flex-col w-full xl:w-1/3 items-stretch'>
                <Suspense fallback={<RecentDiscussionsSkeleton/>}>
                    <RecentDiscussions/>
                </Suspense>
            </div>
        </div>
    </main>
}
export default GrievancesPage
export const metadata = {
    title: 'Grievances',
    description: `Grievances of both the young, small, great, rich and poor`,
}


function GalleryCard({noOfVideos, noOfPlaylists}: {
    noOfVideos: string, noOfPlaylists: string
}) {
    return <Card
        className='inline-flex flex-col dark:bg-accent hover:bg-accent/50 items-center hover:shadow-2xl cursor-pointer'>
        <Link href='/grievances/video-gallery/playlist' className='inline-flex flex-col items-center  w-full h-full'>

            <CardHeader>
                <CardTitle className='flex gap-1'>
                    <VideotapeIcon/>
                    Gallery
                </CardTitle> </CardHeader>
            <CardContent className='flex flex-wrap gap-2 justify-center'>
                <Link href='/grievances/video-gallery/videos'
                      className={cn('flex items-center gap-1', buttonVariants())}>
                    <span className='flex gap-1'><FileVideo/>Videos</span>
                    <span>{noOfVideos.toLocaleString()}</span>
                </Link>
                <Link href='/grievances/video-gallery/playlist'
                      className={cn('flex items-center gap-1', buttonVariants({variant: 'destructive'}))}>
                    <span className='flex gap-1'><ListVideoIcon/>Playlists</span>
                    <span>{noOfPlaylists.toLocaleString()}</span>
                </Link>
            </CardContent>
        </Link>
    </Card>
}

function ChatCard({noOfDiscussions, noOfReplies}: { noOfDiscussions: string, noOfReplies: string }) {
    return <Card
        className='inline-flex dark:bg-accent hover:bg-accent/50 flex-col items-center hover:shadow-2xl cursor-pointer'>
        <Link href='/grievances/chat' className='inline-flex flex-col items-center  w-full h-full'>
            <CardHeader>
                <CardTitle className='flex gap-1'>
                    <MessageCircleIcon/>
                    Chats
                </CardTitle> </CardHeader>
            <CardContent className='flex flex-col items-center gap-2 justify-center'>
                <span>{noOfDiscussions}</span>
                <span>{noOfReplies}</span>
            </CardContent>
        </Link>
    </Card>
}

function QuoteCard({noOfQuotes}: { noOfQuotes: string }) {
    return <Card className='hover:shadow-2xl dark:bg-accent hover:bg-accent/50 cursor-pointer'>
        <Link href='/grievances/quotations' className='inline-flex flex-col items-center  w-full h-full'>
            <CardHeader>
                <CardTitle className='flex gap-1'>
                    <QuoteIcon/>
                    Quotes
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col items-center gap-2'>
                <span>{noOfQuotes.toLocaleString()}</span>
            </CardContent>
        </Link>
    </Card>
}

function PopularQuoteTag({quotation, userName}: { quotation: Quotations | null, userName: string }) {

    return <Link href={`/grievances/quotations/${quotation!.id}`}
                 className='border bg-card dark:bg-accent hover:bg-accent/50 text-accent-foreground
                  max-w-prose  p-3 rounded-md  hover:shadow-2xl cursor-pointer'>
        <div className='float-left text-destructive font-bold pr-1'>
            <QuoteIcon/>
            Quote
        </div>
        <p className='break-words text-clip whitespace-pre-line '>
            {quotation!.content}
        </p>
        <span className='text-xs'>{`${quotation!.title}-${userName}`}</span>

    </Link>
}

function SpotlightCard({noOfStories, noOfInterviews}: { noOfStories: number, noOfInterviews: number }) {
    const spotlight = {
        image: featureImage,
        title: 'Interview with Hon. Jimmy Akena',
        id: 'ldnkskn332mf',
        category: 'Interview'
    }

    function ImageSection() {
        return <div className='relative text-slate-50'>
            <Image src={spotlight.image} alt={spotlight.title} width={300} height={120}
                   className='w-full h-[300px]  xl:h-[450px] object-cover'/>
            <div className='absolute inset-0 bg-gradient-to-b from-black/50 '></div>
            <div className='absolute inset-x-0 inset-y-2 flex  justify-center'>
                <span className='flex gap-1 justify-center text-xl md:text-2xl xl:text-4xl uppercase '>
                     <LightbulbIcon size={48}/>
                    Spotlight
                </span>
            </div>

            <div className=' absolute inset-y-0 inset-x-0 flex flex-wrap p-3 gap-2 items-end justify-between'>
                <span
                    className='font-bold bg-slate-900/30 backdrop-blur-2xl break-words  rounded px-2'>{spotlight.title}</span>
                <Link href={`/grievances/spotlight/${spotlight.id}`}
                      className={cn('flex gap-1 items-center', buttonVariants({variant: 'default'}))}>
                    {`Review ${spotlight.category}`}
                    <ArrowRight className=''/>
                </Link>
            </div>
        </div>
    }

    function ButtonSection() {
        return <CardContent className='flex flex-wrap gap-2 justify-center p-3'>
            <Link href={'/grievances/spotlight/stories'}
                  className={cn('flex gap-1 items-center', buttonVariants({variant: 'default'}))}>
                <span className='flex gap-1 font-bold'><LucideMic2/>Stories</span>
                <span>{noOfStories}</span>
            </Link>
            <Link href={'/grievances/spotlight/interviews'}
                  className={cn('flex gap-1 items-center', buttonVariants({variant: 'destructive'}))}>
                <span className='flex gap-1 font-bold'><LucideMic/>Interviews</span>
                <span>{noOfInterviews}</span>
            </Link>
        </CardContent>
    }

    return <div className='flex flex-col gap-3 bg-card dark:bg-accent rounded-md  border'>
        <ImageSection/>
        <ButtonSection/>
    </div>
}
