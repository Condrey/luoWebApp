import PlaylistSection, {
  PlaylistSectionSkeleton,
} from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/playlist-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideosSection, {
  MainVideosSectionSkeleton,
} from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/videos-section";
import Breadcrumbs from "@/components/ui/bread-crumb";
import { Suspense } from "react";

interface VideoGalleryProps {
  params?: { category: string };
}

export default function VideoGallery({ params }: VideoGalleryProps) {
  const category = params?.category;

  return (
    <div className="flex flex-col gap-3 px-4 md:px-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Grievances", href: "/grievances" },
          {
            label: "Video-Gallery",
            href: "/grievances/video-gallery/playlist",
            active: true,
          },
        ]}
      />
      <Tabs
        defaultValue={category ?? "playlist"}
        className="flex flex-col items-center justify-center"
      >
        <TabsList className="px-4">
          <TabsTrigger value="playlist">All playlists</TabsTrigger>
          <TabsTrigger value="videos">All videos</TabsTrigger>
        </TabsList>
        <TabsContent value="playlist">
          <Suspense fallback={<PlaylistSectionSkeleton />}>
            <PlaylistSection />
          </Suspense>
        </TabsContent>
        <TabsContent value="videos">
          <Suspense fallback={<MainVideosSectionSkeleton />}>
            <VideosSection />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export const metadata = {
  title: `Grievances: Categorized videos expressing local grievances.`,
};
