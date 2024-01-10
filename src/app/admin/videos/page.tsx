import { fetchVideos } from "@/lib/db/data/video-data";
import { fetchPlaylists } from "@/lib/db/data/playlist-data";
import { auth } from "@clerk/nextjs";
import YouTubePlayerWithiFrame from "@/components/you-tube-player-withi-frame";
import { cn, formatDateToLocal } from "@/lib/utils";
import EditVideoButton from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/(components)/editVideoButton";
import { FileVideo } from "lucide-react";
import { VideoGallery, VideoGalleryDescription } from ".prisma/client";

export default async function Page() {
  const videos = await fetchVideos();
  const categories = await fetchPlaylists();
  const { userId } = await auth();
  return (
    <>
      <span>{`List of Videos (${videos.length})`}</span>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id}>
            <AdminVideoContainer
              video={video}
              categories={categories}
              type={video.type!}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function AdminVideoContainer({
  video,
  categories,
  type,
}: {
  video: VideoGallery;
  categories: VideoGalleryDescription[];
  type: VideoGalleryDescription;
}) {
  const wasUpdated = video.updatedAt > video.createdAt;
  const createdUpdatedAtTimestamp = `Uploaded here ${formatDateToLocal(
    wasUpdated ? video.updatedAt : video.createdAt,
  )}`;
  return (
    <div className="flex flex-col md:flex-row xl:flex-col border rounded-md gap-2  bg-background dark:bg-accent/50 cursor-pointer hover:shadow-2xl">
      <div className="relative">
        <div className="flex  flex-row md:flex-col gap-2">
          <div className="flex justify-center pointer-events-none">
            <YouTubePlayerWithiFrame
              youtubeLink={video.url}
              youtubeTitle={video.title}
            />
          </div>
          <div className="max-w-prose p-2">
            <div
              className={cn(
                "flex items-center justify-end pointer-events-auto",
              )}
            >
              <EditVideoButton
                videoToEdit={video}
                categories={categories}
                playlist={type}
                isIconButton={true}
              />
            </div>
            <FileVideo className="float-left" />
            {video.title}
            <br />
            <span className="text-[12px] text-xs mx-1  text-right">
              -{createdUpdatedAtTimestamp}
            </span>
            <span className="text-[12px] text-xs mx-1  text-right">
              -{type?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
