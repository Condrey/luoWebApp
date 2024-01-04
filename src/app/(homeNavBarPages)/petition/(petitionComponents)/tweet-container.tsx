"use client";
import SocialMediaShare from "@/components/social-media-share";
import { webPetitionLink } from "@/lib/constants/Constants";
import { useState } from "react";
import ResponsiveDrawer from "@/components/responsiveDrawer";

export default function TweetContainer({ tweet }: { tweet: string }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <div
        className="cursor-pointer bg-accent dark:bg-accent/50 p-3 hover:bg-background hover:ring ring-border shadow-md  rounded-md aspect-video md:aspect-square flex flex-col justify-center items-center text-center gap-6"
        onClick={() => setOpenDialog(true)}
      >
        <p className="whitespace-pre-line">{tweet}</p>
      </div>
      <ResponsiveDrawer
        open={openDialog}
        title={"Share on Social media"}
        description={tweet}
        setOpen={setOpenDialog}
      >
        <SocialMediaShare
          text={`${tweet} \n\n\nSIGN THE PETITION\n`}
          url={webPetitionLink}
        />
      </ResponsiveDrawer>
    </>
  );
}
