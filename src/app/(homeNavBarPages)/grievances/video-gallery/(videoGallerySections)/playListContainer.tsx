"use client"
import {VideoGalleryDescription as PlaylistModel} from ".prisma/client";
import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import AddEditPlaylistDialog
    from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/addEditPlaylistDialog";

interface PlayListContainerProps {
    playlist: PlaylistModel
}

export default function PlayListContainer({playlist}: PlayListContainerProps) {
    const [showEditDialog, setShowEditDialog] = useState(false)

    return <>
        <Card className='cursor-pointer transition-shadow hover:shadow-lg' onClick={() => setShowEditDialog(true)}>
            <CardHeader>
                <CardTitle>{playlist.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='whitespace-pre-line'>{playlist.description}</p>
            </CardContent>
        </Card>
        <AddEditPlaylistDialog open={showEditDialog} setOpen={setShowEditDialog} playListToEdit={playlist}/>
    </>
}
