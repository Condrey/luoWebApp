import {VideoGalleryDescription} from ".prisma/client";
import prisma from "@/lib/db/prisma";
import {FileVideoIcon} from "lucide-react";
import AddVideoButton
    from "@/app/(homeNavBarPages)/grievances/video-gallery/playlist/[name]/(playlistComponents)/addVideoButton";
import VideoContainer from "@/components/video-container";

interface PlaylistVideosProps {
    playlist: VideoGalleryDescription
}

export default async function PlayListVideos({playlist}: PlaylistVideosProps) {
    const videos = await prisma.videoGallery.findMany({
        where: {categoryId: playlist.id}
    })

    const categories = await prisma.videoGalleryDescription.findMany()

    return <div>
        {
            videos.length > 0 ?
                <div className='grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-4 '>
                    {videos.map((video) => (
                        <VideoContainer key={video.id} video={video}/>
                    ))
                    }
                </div>
                : <div className='max-w-prose flex flex-row gap-1 h-60  justify-center items-center '>
                    <FileVideoIcon size='150px'/>

                    <div className=' flex flex-col gap-2 items-center '>
                        There are no videos for this play list yet.<br/> Please add one
                        <AddVideoButton playlist={playlist!} categories={categories}/>
                    </div>
                </div>
        }
    </div>
}
