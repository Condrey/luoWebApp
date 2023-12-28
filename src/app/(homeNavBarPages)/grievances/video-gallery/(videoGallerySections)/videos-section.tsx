import prisma from "@/lib/db/prisma";
import {FileVideo2} from "lucide-react";
import AddVideoButton
    from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/addVideoButton";
import VideoContainer from "@/components/video-container";
import {fetchVideos} from "@/lib/db/data/video-data";
import {currentUser} from "@clerk/nextjs";

export default async function VideosSection() {

    const videos = await fetchVideos()
    const videosCount = await prisma.videoGallery.count()
    const categories = await prisma.videoGalleryDescription.findMany()
    const user = await currentUser()


    return <div className='flex flex-col gap-3 px-2'>

        <div className='flex justify-between'>
            <div className='text-2xl font-bold flex items-center gap-2'>
                <FileVideo2/>
                <span>{`All videos (${videosCount})`}</span>
            </div>
            <AddVideoButton categories={categories}/>
        </div>
        <div className='grid sm:grid-cols-2  xl:grid-cols-4 gap-2 '>
            {
                videos.length > 0
                    ? <>
                        {
                            videos.map((video) => (
                                    <VideoContainer video={video} key={video.id} fromVideoSection={true} type={video.type!}
                                                    categories={categories} userId={user?.id}/>
                                )
                            )
                        }
                    </>
                    : <>
                        <div className='inline-flex flex-col max-w-sm gap-2'>
                            {"We don't have any videos yet. Please add..."}
                            <AddVideoButton categories={categories}/>
                        </div>
                    </>
            }
        </div>


    </div>
}
