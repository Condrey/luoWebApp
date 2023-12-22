import prisma from "@/lib/db/prisma";
import Breadcrumbs from "@/components/ui/bread-crumb";
import {FileVideoIcon, Info, ListVideo} from "lucide-react";
import AddVideoButton
    from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/addVideoButton";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {VideoGalleryDescription} from ".prisma/client";
import VideoContainer from "@/components/video-container";

interface PlayListSongsProps {
    params: { name: string }
}

export default async function PlayListSongs({params}: PlayListSongsProps) {
    const id = params.name
    const playlist = await prisma.videoGalleryDescription.findUnique(
        {
            where: {
                id
            }
        }
    )
    const categories = await prisma.videoGalleryDescription.findMany()
    const videosNumber = await prisma.videoGallery.count({where: {categoryId: id}})


    return <div className='flex flex-col gap-3'>
        <Breadcrumbs breadcrumbs={[
            {label: 'Grievances', href: '/grievances'},
            {label: 'Video-Gallery Playlist', href: '/grievances/video-gallery/playlist'},
            {label: (playlist?.name), href: `/grievances/video-gallery/playlist/${id}`, active: true},
        ]}/>


        <div className='flex justify-between'>
            <div className='text-2xl font-bold flex items-center gap-2'>
                <ListVideo/>
                <span>{`Playlist / ${playlist?.name} (${videosNumber.toLocaleString()})`}</span>
            </div>
            <AddVideoButton playlist={playlist!} categories={categories}/>
        </div>

        <Alert>
            <Info className="h-4 w-4"/>
            <AlertTitle>Description</AlertTitle>
            <AlertDescription className='whitespace-pre-line'>
                {playlist!.description}
            </AlertDescription>
        </Alert>
        <PlayListVideos playlist={playlist!}/>

    </div>
}

interface PlaylistVideosProps {
    playlist: VideoGalleryDescription
}

async function PlayListVideos({playlist}: PlaylistVideosProps) {
    const videos = await prisma.videoGallery.findMany({
        where: {categoryId: playlist.id},
        include: {type: true}
    })

    const categories = await prisma.videoGalleryDescription.findMany(
        {
            include: {videoGalleries: true}
        }
    )
    console.log('Categories with videos', categories[0].videoGalleries)

    return <div>
        {
            videos.length > 0 ?
                <div className='grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-4 '>
                    {videos.map((video) => (
                        <VideoContainer key={video.id} video={video} type={video.type!}/>
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
