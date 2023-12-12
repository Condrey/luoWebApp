"use client"
import {VideoGalleryDescription as PlaylistModel} from ".prisma/client";
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {ListVideo} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

interface PlayListContainerProps {
    playlist: PlaylistModel
}

export default function PlayListContainer({playlist}: PlayListContainerProps) {
    const [showEditDialog, setShowEditDialog] = useState(false)
    return <div className='bg-accent dark:bg-accent/50 rounded-md'>
        <HoverCard>
            <HoverCardTrigger className='cursor-pointer ' asChild>
                <Link href={`/grievances/video-gallery/playlist/${playlist.id}`}>
                    <div className='flex flex-col gap-2 border-2 shadow-2xl hover:drop-shadow-xl h-full'>
                        {
                            playlist.poster &&
                            <Image
                                src={playlist.poster}
                                alt={playlist.name}
                                width={896}
                                height={640}
                                className='w-full h-[150px] object-cover aspect-square'
                            />
                        }

                        <span
                            className='flex  gap-2 items-center text-xl font-bold px-4 pb-2'>
                        <ListVideo/>
                            {playlist.name}
                    </span>

                    </div>

                </Link>
            </HoverCardTrigger>
            <HoverCardContent className='p-0 rounded-md drop-shadow-xl'>
                <div className='flex flex-col flex-wrap bg-accent  rounded-md'>
                    {playlist.poster &&
                        <Image src={playlist.poster} alt={playlist.name} width={896} height={640}
                               className='w-full h-[150px] object-cover aspect-square '/>}
                    <CardHeader>
                        <CardTitle>{playlist.name}</CardTitle>
                        <CardDescription>
                            <p className='whitespace-pre-line'>{playlist.description}</p>
                        </CardDescription>
                    </CardHeader>

                </div>

            </HoverCardContent>
        </HoverCard>


        {/*<AddEditPlaylistDialog open={showEditDialog} setOpen={setShowEditDialog} playListToEdit={playlist}/>*/}
    </div>
}
