import VideoPage from "@/components/video-page";
import Breadcrumbs from "@/components/ui/bread-crumb";
import { fetchVideoById } from "@/lib/db/data/video-data";

interface PageProps {
  params: { videoUrl: string };
}

export default async function Page({ params }: PageProps) {
  const video = await fetchVideoById(params.videoUrl);
  const playlist = video?.type;
  return (
    <div className="px-4 md:px-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Grievances", href: "/grievances" },
          {
            label: "Video-Gallery Playlist",
            href: "/grievances/video-gallery/playlist",
          },
          {
            label: playlist?.name,
            href: `/grievances/video-gallery/playlist/${playlist!.id}`,
          },
          {
            label: video?.title,
            href: `/grievances/video-gallery/playlist/${playlist!.id}/${
              params.videoUrl
            }`,
            active: true,
          },
        ]}
      />
      <VideoPage params={params} />
    </div>
  );
}
