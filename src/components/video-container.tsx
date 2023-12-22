'use client'
import {VideoGallery, VideoGalleryDescription} from ".prisma/client";
import {useState} from "react";
import Link from "next/link";
import YouTubePlayer from "@/components/youtube-player";
import {FileVideo, PlayCircleIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useParams} from "next/navigation";

interface VideoContainerProps {
    video: VideoGallery,
    type?: VideoGalleryDescription,
    fromVideoSection?: boolean
}

export default function VideoContainer({video, type, fromVideoSection = false}: VideoContainerProps) {
    const params = useParams()
    console.log(params)
    const isPlaying = params.videoUrl === video.id || params.name === video.id
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const wasUpdated = video.updatedAt > video.createdAt
    const createdUpdatedAtTimestamp = (
        wasUpdated ? video.updatedAt : video.createdAt
    ).toDateString()
    let urlLink
    if (isPlaying) {
        urlLink = "#"
    } else {
        if (fromVideoSection) {
            urlLink = `/grievances/video-gallery/videos/${video.id}`
        } else {
            urlLink = `/grievances/video-gallery/playlist/${video.videoGalleryDescriptionId}/${video.id}`
        }
    }

    return <Link key={video.id}
                 href={urlLink}
                 onClick={() => setIsLoading(true)}
                 className={cn('flex flex-col md:flex-row xl:flex-col border rounded-md gap-2 p-2 bg-background dark:bg-accent cursor-pointer hover:shadow-2xl', isPlaying ? 'pointer-events-none bg-gradient-to-t  from-amber-500 dark:from-amber-400 to-80%  text-slate-950' : 'bg-gradient-to-b from-blue-400 to-fuchsia-400/20')}>
        <div className='relative'>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div
                        className="loader ease-linear border-4 border-background border-dashed rounded-full h-12 w-12 animate-spin"></div>
                </div>
            )}
            <div className='flex  flex-row md:flex-col gap-2'>
                <div className='flex justify-center pointer-events-none'>
                    <YouTubePlayer youtubeLink={video.url} youtubeTitle={video.title}/>
                </div>
                <span className='max-w-prose px-2'>
                                <FileVideo className='float-left'/>
                    {video.title}
                    <br/>
                    <span className='text-[12px] font-thin  text-right'>-{createdUpdatedAtTimestamp}</span>
                    <span className='text-[12px] font-thin  text-right'>-{type?.name}</span>
                    <div className={cn('flex float-right font-bold', !isPlaying && 'hidden')}>
                        <PlayCircleIcon className='animate-spin '/>
                        Mounted
                    </div>
        </span>
            </div>

        </div>
    </Link>


}
