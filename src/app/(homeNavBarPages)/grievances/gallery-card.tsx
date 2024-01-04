import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FileVideo, ListVideoIcon, VideotapeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchVideosAndPlaylistCount } from "@/lib/db/data/video-data";

export default async function GalleryCard() {
  const { videoCount, playlistCount } = await fetchVideosAndPlaylistCount();
  return (
    <Card className="inline-flex flex-col dark:bg-accent hover:bg-accent/50 items-center hover:shadow-2xl cursor-pointer">
      <Link
        href="/grievances/video-gallery/playlist"
        className="inline-flex flex-col items-center  w-full h-full"
      >
        <CardHeader>
          <CardTitle className="flex gap-1">
            <VideotapeIcon />
            Gallery
          </CardTitle>{" "}
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 justify-center">
          <Link
            href="/grievances/video-gallery/videos"
            className={cn("flex items-center gap-1", buttonVariants())}
          >
            <span className="flex gap-1">
              <FileVideo />
              Videos
            </span>
            <span>{videoCount}</span>
          </Link>
          <Link
            href="/grievances/video-gallery/playlist"
            className={cn(
              "flex items-center gap-1",
              buttonVariants({ variant: "destructive" }),
            )}
          >
            <span className="flex gap-1">
              <ListVideoIcon />
              Playlists
            </span>
            <span>{playlistCount}</span>
          </Link>
        </CardContent>
      </Link>
    </Card>
  );
}

export function GalleryCardSkeleton() {
  return <Skeleton className="h-[250px] w-[250px] "></Skeleton>;
}
