import prisma from "@/lib/db/prisma";
import {InfoIcon, LinkIcon} from "lucide-react";
import YouTubePlayer from "@/components/youtube-player";
import {VideoGallery, VideoGalleryDescription} from ".prisma/client";
import {Badge} from '@/components/ui/badge'
import VideoContainer from "@/components/video-container";
import {Button} from "@/components/ui/button";

interface VideoPageProps {
    params: { videoUrl: string }
}

interface VideoParametersProp {
    video: VideoGallery
}

interface SimilarPlaylistProp {
    videos: VideoGallery[]
    playlist?: VideoGalleryDescription
}

export default async function VideoPage({params}: VideoPageProps) {
    const video = await prisma.videoGallery.findUnique({where: {id: params.videoUrl}})
    const playlist = await prisma.videoGalleryDescription.findUnique({where: {id: video?.categoryId}})
    const videos = await prisma.videoGallery.findMany({where: {categoryId: video?.categoryId}})

    return <div>
        <div className='flex flex-col xl:flex-row h-full p-4 gap-4'>
            <div className='w-full flex flex-col gap-3'>
                <div className='h-[300px] md:h-[500px]'>
                    <YouTubePlayer youtubeLink={video!.url} youtubeTitle={video?.title}/>
                </div>
                <VideoParameters video={video!}/>
            </div>
            <div className='p-2 md:p-4 xl:w-1/3 flex flex-col gap-3  '>
                <SimilarPlaylist videos={videos!} playlist={playlist!}/>
            </div>
        </div>
    </div>
}


function VideoParameters({video}: VideoParametersProp) {
    const wasUpdated = video!.updatedAt > video!.createdAt
    const createdUpdatedAtTimestamp = (
        wasUpdated ? video!.updatedAt : video!.createdAt
    ).toDateString()
    return <div className='flex flex-col gap-3 max-w-prose border rounded-sm bg-accent p-2 md:p-4'>
        <span className='md:text-2xl'>{video?.title}</span>
        <span className='select-all'>{createdUpdatedAtTimestamp}</span>
        <div className='text-muted-foreground'>
            <InfoIcon className='float-left mr-1'/>{video?.description}
        </div>
        <div>
            <LinkIcon className='float-left mr-1'/>
            <span className='select-all'>{video?.url}</span>
        </div>
    </div>
}

function SimilarPlaylist({videos, playlist}: SimilarPlaylistProp) {
    return <div className='flex flex-col gap-3'>
        <div className='flex flex-row gap-1'>
            <Button>All</Button>
            <Button>Playlists</Button>
            <Badge variant='outline'>{`${playlist?.name}`}</Badge>
        </div>
        <div className='flex flex-col gap-3'>
            {
                videos.map((video) => (
                    <div key={video.id}>
                        <VideoContainer video={video}/>
                    </div>
                ))
            }
        </div>

    </div>

}
