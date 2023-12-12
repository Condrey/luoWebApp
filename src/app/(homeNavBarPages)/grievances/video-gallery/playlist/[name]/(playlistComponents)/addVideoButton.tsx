'use client'
import {Button} from "@/components/ui/button";
import {useState} from "react";
import AddEditVideoDaialog
    from "@/app/(homeNavBarPages)/grievances/video-gallery/playlist/[name]/(playlistComponents)/AddEditVideoDaialog";
import {VideoGalleryDescription} from ".prisma/client";

interface AddVideoButtonProps {
    playlist?: VideoGalleryDescription
    categories?: VideoGalleryDescription[]
}

export default function AddVideoButton({playlist, categories}: AddVideoButtonProps) {
    const [showAddEditVideoDialog, setShowAddEditVideoDialog] = useState(false)

    return (
        <>
            <Button variant='destructive' onClick={() => setShowAddEditVideoDialog(true)}>Add Video</Button>
            <AddEditVideoDaialog open={showAddEditVideoDialog} setOpen={setShowAddEditVideoDialog} playlist={playlist}
                                 categories={categories}/>
        </>
    )
}
