import {Info, ListVideo} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import prisma from "@/lib/db/prisma";
import PlayListVideos
    from "@/app/(homeNavBarPages)/grievances/video-gallery/playlist/[name]/(playlistComponents)/videos";
import AddVideoButton
    from "@/app/(homeNavBarPages)/grievances/video-gallery/playlist/[name]/(playlistComponents)/addVideoButton";


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
        <div className='flex justify-between'>
            <div className='text-2xl font-bold flex items-center gap-2'>
                <ListVideo/>
                <span>{`Playlist / ${playlist!.name} (${videosNumber.toLocaleString()})`}</span>
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
