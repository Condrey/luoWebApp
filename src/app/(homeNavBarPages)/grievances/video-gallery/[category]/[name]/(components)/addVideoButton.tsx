'use client'
import {Button} from "@/components/ui/button";
import {useState} from "react";
import AddEditVideoDaialog
    from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/AddEditVideoDaialog";
import {VideoGalleryDescription} from ".prisma/client";
import {Plus} from "lucide-react";

interface AddVideoButtonProps {
    playlist?: VideoGalleryDescription
    categories?: VideoGalleryDescription[]
}

export default function AddVideoButton({playlist, categories}: AddVideoButtonProps) {
    const [showAddEditVideoDialog, setShowAddEditVideoDialog] = useState(false)

    return (
        <>
            <Button variant='destructive' onClick={() => setShowAddEditVideoDialog(true)}>
                <Plus className="mr-2"/>
                Add Video</Button>
            <AddEditVideoDaialog open={showAddEditVideoDialog} setOpen={setShowAddEditVideoDialog} playlist={playlist}
                                 categories={categories}/>
        </>
    )
}
