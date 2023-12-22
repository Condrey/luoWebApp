"use client";
import {VideoGalleryDescription as PlaylistModel} from ".prisma/client";
import Image from "next/image";
import {ListVideo} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

interface PlayListContainerProps {
    playlist: PlaylistModel;
    videoNumber: number;
}

export default function PlayListContainer({
                                              playlist,
                                              videoNumber,
                                          }: PlayListContainerProps) {
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const noOfVideos = videoNumber === 1 ? '1 video' : `${videoNumber.toLocaleString()} videos`
    return (
        <div
            className="bg-accent dark:bg-accent/50 rounded-md"
            onClick={() => setIsLoading(true)}
        >
            <Link href={`/grievances/video-gallery/playlist/${playlist.id}`}>
                <div className="relative bg-amber-400 text-slate-950 h-full">
                    <div className="flex flex-col gap-2 border-2 shadow-2xl hover:drop-shadow-xl h-full">
                        {playlist.poster && (
                            <Image
                                src={playlist.poster}
                                alt={playlist.name}
                                width={896}
                                height={640}
                                className="w-full h-[150px] object-cover aspect-square"
                            />
                        )}

                        <div className="text-xl font-bold px-4 pb-2 align-baseline">
                            <ListVideo className="float-left "/>
                            {`${playlist.name}`}
                            <br/>
                            <span className='font-thin text-sm'>{noOfVideos} </span>
                        </div>
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div
                                className="loader ease-linear border-4 border-background border-dashed rounded-full h-12 w-12 animate-spin"></div>
                        </div>
                    )}
                </div>
            </Link>

            {/*<AddEditPlaylistDialog open={showEditDialog} setOpen={setShowEditDialog} playListToEdit={playlist}/>*/}
        </div>
    );
}

/**
 *         <HoverCard>
 *             <HoverCardTrigger className='cursor-pointer ' asChild>
 *             </HoverCardTrigger>
 *             <HoverCardContent className='p-0 rounded-md drop-shadow-xl'>
 *                 <div className='flex flex-col flex-wrap bg-accent  rounded-md'>
 *                     {playlist.poster &&
 *                         <Image src={playlist.poster} alt={playlist.name} width={896} height={640}
 *                                className='w-full h-[150px] object-cover aspect-square '/>}
 *                     <CardHeader>
 *                         <CardTitle>{playlist.name}</CardTitle>
 *                         <CardDescription>
 *                             <p className='whitespace-pre-line'>{playlist.description}</p>
 *                         </CardDescription>
 *                     </CardHeader>
 *
 *                 </div>
 *             </HoverCardContent>
 *         </HoverCard>
 */
