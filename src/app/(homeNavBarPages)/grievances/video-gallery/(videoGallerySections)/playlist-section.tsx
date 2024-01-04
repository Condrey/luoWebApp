import prisma from "@/lib/db/prisma";
import PlayListContainer from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/playListContainer";
import { ListVideo } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PlaylistSection() {
  const allPlayLists = await prisma.videoGalleryDescription.findMany({
    include: { videoGalleries: true },
  });
  const allPlayListsCount = await prisma.videoGalleryDescription.count();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="text-2xl font-bold flex items-center gap-2">
          <ListVideo />
          <span className="text-2xl font-bold">{`All playlists (${allPlayListsCount})`}</span>
        </div>
        {/*<AddPlaylistButton/>*/}
      </div>

      <div className="grid sm:grid-cols-2  xl:grid-cols-4 gap-2 ">
        {allPlayLists.length > 0 ? (
          <>
            {allPlayLists.map((playlist) => (
              <PlayListContainer
                playlist={playlist}
                videoNumber={playlist.videoGalleries.length}
                key={playlist.id}
              />
            ))}
          </>
        ) : (
          <>
            <div className="inline-flex flex-col max-w-sm gap-2">
              {"We don't have any playlists yet. Soon creating..."}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function PlaylistSectionSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="text-2xl font-bold flex items-center gap-2">
          <ListVideo />
          <span className="text-2xl font-bold">{`All playlists `}</span>
        </div>
        {/*<AddPlaylistButton/>*/}
      </div>

      <div className="grid sm:grid-cols-2  xl:grid-cols-4 gap-2 ">
        {Array.from({ length: 12 }, (_, index) => (
          <Skeleton key={index} className="w-auto h-[250px]" />
        ))}
      </div>
    </div>
  );
}
