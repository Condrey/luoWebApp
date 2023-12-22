import prisma from "@/lib/db/prisma";
import {FileVideo, InfoIcon, LinkIcon} from "lucide-react";
import YouTubePlayer from "@/components/youtube-player";
import {VideoGallery, VideoGalleryDescription} from ".prisma/client";
import {Badge} from '@/components/ui/badge'
import VideoContainer from "@/components/video-container";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";

interface VideoPageProps {
    params: { videoUrl: string | null }
    fromVideoSection?: boolean

}

interface VideoParametersProp {
    video: VideoGallery
}

interface SimilarPlaylistProp {
    videos: VideoGallery[]
    playlist?: VideoGalleryDescription
    fromVideoSection?: boolean
}

export default async function VideoPage({params, fromVideoSection}: VideoPageProps) {
    const video = await prisma.videoGallery.findUnique({where: {id: params.videoUrl!}})
    const playlist = await prisma.videoGalleryDescription.findUnique({where: {id: video?.categoryId}})
    const videos = await prisma.videoGallery.findMany({where: {categoryId: video?.categoryId}})

    return <div>
        <div className='flex flex-col gap-3'>

            <div>
                <span className='md:text-2xl'> <FileVideo className='float-left pr-1'/> {video?.title}</span>
            </div>
        </div>
        <div className='flex flex-col xl:flex-row h-full p-4 gap-4'>
            <div className='w-full flex flex-col gap-3'>
                <div className='h-[300px] md:h-[500px]'>
                    <YouTubePlayer youtubeLink={video!.url} youtubeTitle={video?.title}/>
                </div>
                <VideoParameters video={video!}/>
            </div>
            <div className='p-2 md:p-4 xl:w-1/3 flex flex-col gap-3  '>
                <SimilarPlaylist videos={videos!} playlist={playlist!} fromVideoSection={fromVideoSection}/>
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

function SimilarPlaylist({videos, playlist, fromVideoSection = false}: SimilarPlaylistProp) {
    return <div className='flex flex-col gap-3'>
        <div className='flex flex-row gap-1'>
            <Link href={'/grievances/video-gallery/videos'} className={buttonVariants({variant: 'default'})}>All</Link>
            <Link href={'/grievances/video-gallery/playlist'}
                  className={buttonVariants({variant: 'default'})}>Playlists</Link>
            <Badge variant='outline'>{`${playlist?.name}`}</Badge>
        </div>
        <div className='flex flex-col gap-3'>
            {
                videos.map((video) => (
                    <div key={video.id}>
                        <VideoContainer video={video} fromVideoSection={fromVideoSection}/>
                    </div>
                ))
            }
        </div>

    </div>

}
