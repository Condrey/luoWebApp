"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddEditVideoDaialog from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/AddEditVideoDaialog";
import { VideoGallery, VideoGalleryDescription } from ".prisma/client";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditVideoButtonProps {
  playlist?: VideoGalleryDescription;
  categories?: VideoGalleryDescription[];
  videoToEdit: VideoGallery;
  isIconButton?: boolean;
}

export default function EditVideoButton({
  playlist,
  categories,
  videoToEdit,
  isIconButton = false,
}: EditVideoButtonProps) {
  const [showAddEditVideoDialog, setShowAddEditVideoDialog] = useState(false);

  return (
    <>
      <Button
        variant={isIconButton ? "ghost" : "destructive"}
        onClick={() => setShowAddEditVideoDialog(true)}
        className={cn(isIconButton && "rounded-full py-1 px-2")}
      >
        <Pencil className={cn(isIconButton && "size-5")} />
        <span className={cn(isIconButton && "hidden")}>Edit Video</span>
      </Button>
      <AddEditVideoDaialog
        open={showAddEditVideoDialog}
        setOpen={setShowAddEditVideoDialog}
        playlist={playlist}
        categories={categories}
        videoToEdit={videoToEdit}
      />
    </>
  );
}
