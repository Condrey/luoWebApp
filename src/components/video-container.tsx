import {VideoGallery} from ".prisma/client";
import YouTubePlayer from "@/components/youtube-player";
import {FileVideo} from "lucide-react";
import Link from "next/link";

interface VideoContainerProps {
    video: VideoGallery
}

export default function VideoContainer({video}: VideoContainerProps) {
    const wasUpdated = video.updatedAt > video.createdAt
    const createdUpdatedAtTimestamp = (
        wasUpdated ? video.updatedAt : video.createdAt
    ).toDateString()
    return <Link key={video.id} href={`/video/${video.id}`}
                 className='flex flex-col md:flex-row xl:flex-col border rounded-md gap-2 p-2 bg-background dark:bg-accent cursor-pointer hover:shadow-2xl'>
        <div className='flex justify-center pointer-events-none'>
            <YouTubePlayer youtubeLink={video.url} youtubeTitle={video.title}/>
        </div>
        <span className='max-w-prose px-2'>
                                <FileVideo className='float-left'/>
            {video.title}
            <br/> <span
            className='text-[12px] font-thin text-muted-foreground text-right'>-{createdUpdatedAtTimestamp}</span>
                            </span>
    </Link>

}
