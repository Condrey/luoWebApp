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
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Breadcrumbs from "@/components/ui/bread-crumb";
import {populateGrievancesCounter} from "@/lib/db/data/grievances-data";

const GrievancesPage = async () => {
    const {
        numberOfQuotes,
        numberOfTopics,
        numberOfPlaylists,
        numberOfVideos,
        numberOfTopicReplies
    } = await populateGrievancesCounter()
    return <main className="flex min-h-screen flex-col gap-6">
        <Breadcrumbs breadcrumbs={[
            {label: 'Grievances', href: '/grievances', active: true}
        ]}/>
        <div id='first section' className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-3'>
            <GalleryCard noOfPlaylists={numberOfPlaylists} noOfVideos={numberOfVideos}/>
            <ChatCard noOfDiscussions={numberOfTopics} noOfReplies={numberOfTopicReplies}/>
            <QuoteCard noOfQuotes={numberOfQuotes}/>
        </div>
        <PopularQuoteTag/>
        <div className='flex flex-col md:flex-row gap-3'>
            <div className='flex flex-col w-full xl:w-2/3'>
                <SpotlightCard noOfStories={200} noOfInterviews={100}/>
            </div>
            <div className='flex flex-col w-full xl:w-1/3'>
                <RecentDiscussionsCard/>
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
    return <Card className='inline-flex flex-col items-center hover:shadow-2xl cursor-pointer'>
        <Link href='/grievances/video-gallery/playlist' className='inline-flex flex-col items-center  w-full h-full'>

            <CardHeader>
                <CardTitle className='flex gap-1'>
                    <VideotapeIcon/>
                    Gallery
                </CardTitle> </CardHeader>
            <CardContent className='flex flex-wrap gap-2 justify-center'>
                <Link href='/grievances/video-gallery/videos'
                      className='flex  items-center border border-slate-800  dark:border-accent cursor-pointer rounded-md p-3 gap-3 bg-accent hover:bg-slate-900 hover:text-slate-50 text-accent-foreground'>
                    <span className='flex gap-1'><FileVideo/>Videos</span>
                    <span>{noOfVideos.toLocaleString()}</span>
                </Link>
                <Link href='/grievances/video-gallery/playlist'
                      className=' flex  items-center border border-destructive  rounded-md p-3 gap-3 bg-destructive hover:bg-red-700 cursor-pointer text-destructive-foreground'>
                    <span className='flex gap-1'><ListVideoIcon/>Playlists</span>
                    <span>{noOfPlaylists.toLocaleString()}</span>
                </Link>
            </CardContent>
        </Link>
    </Card>
}

function ChatCard({noOfDiscussions, noOfReplies}: { noOfDiscussions: string, noOfReplies: string }) {
    return <Card className='inline-flex flex-col items-center hover:shadow-2xl cursor-pointer'>
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
    return <Card className='hover:shadow-2xl cursor-pointer'>
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

function PopularQuoteTag() {

    const quotation = {
        id: 'ldnlsknlkdnsknkl', quote: 'nlddnlksnlkndlksnlkndlsknlkndlknsldmlndlksnlknldknslknlkndlsk\n' +
            '                dslknlkndlksnlknlkdnlsnlknlkds\n' +
            '                dsknlknlknlknkdnlknlknds'
    }
    return <Link href={`/grievances/quotations/${quotation.id}`}
                 className='bg-background p-3 rounded-md  hover:shadow-2xl cursor-pointer'>
        <div className='float-left text-destructive font-bold pr-1'>
            <QuoteIcon/>
            Popular Quote
        </div>
        <p className='break-words text-clip whitespace-pre-line'>
            {quotation.quote}

        </p>

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
                     <LightbulbIcon/>
                    Spotlight
                </span>
            </div>

            <div className=' absolute inset-y-0 inset-x-0 flex p-3 gap-2 items-end justify-between'>
                <span className='font-bold'>{spotlight.title}</span>
                <Link href={`/grievances/spotlight/${spotlight.id}`}
                      className={buttonVariants({variant: 'default'})}>
                    {`Review ${spotlight.category}`}
                    <ArrowRight className=''/>
                </Link>
            </div>
        </div>
    }

    function ButtonSection() {
        return <CardContent className='flex flex-wrap gap-2 justify-center p-3'>
            <Link href={'/grievances/spotlight/stories'}
                  className='flex  items-center border border-slate-800  dark:border-accent cursor-pointer rounded-md  p-3 gap-3 bg-accent hover:bg-slate-900 hover:text-slate-50 text-accent-foreground'>
                <span className='flex gap-1 font-bold'><LucideMic2/>Stories</span>
                <span>{noOfStories}</span>
            </Link>
            <Link href={'/grievances/spotlight/interviews'}
                  className=' flex  items-center border border-destructive rounded-md  p-3 gap-3 bg-destructive hover:bg-red-700 cursor-pointer text-destructive-foreground'>
                <span className='flex gap-1 font-bold'><LucideMic/>Interviews</span>
                <span>{noOfInterviews}</span>
            </Link>
        </CardContent>
    }

    return <div className='flex flex-col gap-3 bg-background rounded-md  border'>
        <ImageSection/>
        <ButtonSection/>
    </div>
}

function RecentDiscussionsCard() {
    const discussions = [
        {title: 'Initiative to mitigate', discussant: 'Hon Akena Obote', id: 'knclxnlknl'},
        {title: 'We must fight for the legacy', discussant: 'Young Emma', id: 'dnlkndsn'},
        {title: 'Uganda must style up', discussant: 'Susan Betty', id: 'kdnlsknlkds'},
    ]

    function DiscussionContainer() {
        return <div>

        </div>
    }

    return <div className='flex flex-col gap-3 bg-background h-full rounded-md p-3 border'>
        <span className='text-xl md:text-2xl   flex justify-center'>Recent Discussions</span>
        {
            discussions.map((discussion) => (
                <div key={discussion.id}>
                    <Alert>
                        <Avatar>
                            <AvatarImage></AvatarImage>
                        </Avatar>
                        <AlertTitle>{discussion.title}</AlertTitle>
                        <AlertDescription>-{discussion.discussant}</AlertDescription>
                    </Alert>
                </div>
            ))
        }
    </div>
}
