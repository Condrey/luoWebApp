import {fetchVideosByNumber} from "@/lib/db/data/video-data";
import VideoContainer from "@/components/video-container";
import Link from "next/link";
import {ArrowRightIcon} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import AddVideoButton
    from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/addVideoButton";
import {fetchPlaylists} from "@/lib/db/data/playlist-data";
import {currentUser} from "@clerk/nextjs";
import {cn} from "@/lib/utils";

const VideosSection = async () => {
    const videos = await fetchVideosByNumber(7)
    const categories = await fetchPlaylists()
    const user = await currentUser()
    return <div className='flex px-4 flex-col items-center gap-6'>
        <div className='max-w-7xl '>
            <div
                className="text-center gap-6 uppercase  text-4xl md:text-5xl text-primary dark:text-accent break-words  font-black w-auto p-5">
                Sample videos
            </div>
            <div className='grid  md:grid-cols-2 lg:grid-cols-3 items-stretch  gap-6'>
                {
                    videos.map((video) => (
                        <VideoContainer key={video.id} video={video} fromVideoSection={true} type={video.type!}
                                        categories={categories} userId={user?.id}/>
                    ))
                }
                <div className='flex justify-center items-center flex-col gap-4 rounded-md border min-h-60'>
                    <div className={cn(!user && 'hidden')}><AddVideoButton categories={categories}/></div>
                    <Link href='/grievances/video-gallery/videos' className={buttonVariants()}>
                        More videos <ArrowRightIcon/>
                    </Link>
                    <Link href='/grievances/video-gallery/playlist' className={buttonVariants()}>
                        See playlist <ArrowRightIcon/>
                    </Link>

                </div>
            </div>

        </div>
    </div>
}

export default VideosSection
