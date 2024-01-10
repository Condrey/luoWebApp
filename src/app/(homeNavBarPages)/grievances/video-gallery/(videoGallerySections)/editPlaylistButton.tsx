"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import AddEditPlaylistDialog from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/addEditPlaylistDialog";
import { VideoGalleryDescription } from ".prisma/client";

export default function EditPlaylistButton({
  playlistToEdit,
}: {
  playlistToEdit: VideoGalleryDescription;
}) {
  const [showAddEditPlaylistDialog, setShowAddEditPlaylistDialog] =
    useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowAddEditPlaylistDialog(true)}
      >
        <Pencil className="mr-2" />
        Edit
      </Button>
      <AddEditPlaylistDialog
        open={showAddEditPlaylistDialog}
        setOpen={setShowAddEditPlaylistDialog}
        playListToEdit={playlistToEdit}
      />
    </>
  );
}
