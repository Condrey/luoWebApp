"use client"

import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useState} from "react";
import AddEditPlaylistDialog
    from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/addEditPlaylistDialog";


export default function AddPlaylistButton() {
    const [showAddEditPlaylistDialog, setShowAddEditPlaylistDialog] = useState(false)

    return <>
        <Button variant='destructive' onClick={() => setShowAddEditPlaylistDialog(true)}>
            <Plus className="mr-2"/>
            Add Playlist
        </Button>
        <AddEditPlaylistDialog open={showAddEditPlaylistDialog} setOpen={setShowAddEditPlaylistDialog} />
    </>
}
