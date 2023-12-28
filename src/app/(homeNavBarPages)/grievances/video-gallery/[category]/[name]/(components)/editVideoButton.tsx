'use client'
import {Button} from "@/components/ui/button";
import {useState} from "react";
import AddEditVideoDaialog
    from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/AddEditVideoDaialog";
import {VideoGallery, VideoGalleryDescription} from ".prisma/client";
import {Pencil} from "lucide-react";

interface EditVideoButtonProps {
    playlist?: VideoGalleryDescription
    categories?: VideoGalleryDescription[]
    videoToEdit: VideoGallery
}


export default function EditVideoButton({playlist, categories, videoToEdit}: EditVideoButtonProps) {
    const [showAddEditVideoDialog, setShowAddEditVideoDialog] = useState(false)

    return (
        <>
            <Button variant='destructive' onClick={() => setShowAddEditVideoDialog(true)}>
                <Pencil className="mr-2"/>
                Edit Video</Button>
            <AddEditVideoDaialog open={showAddEditVideoDialog} setOpen={setShowAddEditVideoDialog} playlist={playlist}
                                 categories={categories} videoToEdit={videoToEdit}/>
        </>
    )
}
