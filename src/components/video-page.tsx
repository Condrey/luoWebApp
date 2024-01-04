import { FileVideo, InfoIcon, LinkIcon } from "lucide-react";
import YouTubePlayerWithiFrame from "@/components/you-tube-player-withi-frame";
import { VideoGallery, VideoGalleryDescription } from ".prisma/client";
import { Badge } from "@/components/ui/badge";
import VideoContainer from "@/components/video-container";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { fetchVideoByIdWithPlaylistAndVideos } from "@/lib/db/data/video-data";
import { cn, formatDateToLocal } from "@/lib/utils";
import EditVideoButton from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/editVideoButton";
import { fetchPlaylists } from "@/lib/db/data/playlist-data";
import { currentUser } from "@clerk/nextjs";

interface VideoPageProps {
  params: { videoUrl: string | null };
  fromVideoSection?: boolean;
}

interface VideoParametersProp {
  video: VideoGallery;
  categories: VideoGalleryDescription[];
  playlist: VideoGalleryDescription;
  userId: string | undefined;
}

export default async function VideoPage({
  params,
  fromVideoSection,
}: VideoPageProps) {
  const video = await fetchVideoByIdWithPlaylistAndVideos(params.videoUrl!);
  const playlist = video!.type;
  const videos = playlist!.videoGalleries;
  const categories = await fetchPlaylists();
  const user = await currentUser();

  return (
    <div>
      <div className="flex flex-col gap-3 bg">
        <div>
          <span className="md:text-2xl">
            {" "}
            <FileVideo className="float-left pr-1" /> {video?.title}
          </span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row h-full py-4 gap-4">
        <div className="w-full flex flex-col gap-3">
          <div className="h-[300px] md:h-[500px]">
            <YouTubePlayerWithiFrame
              youtubeLink={video!.url}
              youtubeTitle={video?.title}
            />
          </div>
          <VideoParameters
            video={video!}
            playlist={playlist!}
            categories={categories!}
            userId={user?.id}
          />
        </div>
        <div className="py-2 md:py-4 xl:w-1/3 flex flex-col gap-3  ">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-1">
              <Link
                href={"/grievances/video-gallery/videos"}
                className={buttonVariants({ variant: "default" })}
              >
                All
              </Link>
              <Link
                href={"/grievances/video-gallery/playlist"}
                className={buttonVariants({ variant: "default" })}
              >
                Playlists
              </Link>
              <Badge
                variant="outline"
                className="border"
              >{`${playlist?.name}`}</Badge>
            </div>
            <div className="flex flex-col gap-3 max-w-prose">
              {videos.map((video) => (
                <div key={video.id}>
                  <VideoContainer
                    video={video}
                    fromVideoSection={fromVideoSection}
                    type={video.type!}
                    userId={user?.id}
                    categories={categories}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoParameters({
  video,
  categories,
  playlist,
  userId,
}: VideoParametersProp) {
  const wasUpdated = video!.updatedAt > video!.createdAt;
  const createdUpdatedAtTimestamp = `Uploaded here ${formatDateToLocal(
    wasUpdated ? video.updatedAt : video.createdAt,
  )}`;
  return (
    <div className="space-y-3 max-w-prose md:border rounded-sm md:dark:bg-accent md:bg-background p-2 md:p-4">
      <span className="md:text-2xl">{video?.title}</span>
      <br />
      <span className="select-all text-xs">-{createdUpdatedAtTimestamp}</span>
      <div className="text-muted-foreground">
        <InfoIcon className="float-left mr-1 whitespace-pre-line" />
        {video?.description}
      </div>
      <div>
        <Link
          href={video.url}
          passHref
          target="_blank"
          className="text-sky-700 dark:text-sky-500"
        >
          <LinkIcon className="float-left mr-1" />
          <span className="select-all">Original Youtube link</span>
        </Link>
      </div>
      <div
        className={cn(
          "flex items-center justify-center ",
          video.userId !== userId && "hidden",
        )}
      >
        <div className="float-right">
          <EditVideoButton
            videoToEdit={video}
            categories={categories}
            playlist={playlist}
          />
        </div>
      </div>
    </div>
  );
}
