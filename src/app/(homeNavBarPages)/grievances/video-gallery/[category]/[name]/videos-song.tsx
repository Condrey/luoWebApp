import Breadcrumbs from "@/components/ui/bread-crumb";
import {fetchVideoById} from "@/lib/db/data/video-data";
import VideoPage from "@/components/video-page";

interface PageProps {
    params: {
        videoUrl: string | null;
        name: string
    }
}

export default async function VideosSong({params}: PageProps) {
    const id = params.name
    params.videoUrl = id
    const video = await fetchVideoById(id)
    return <div className='flex flex-col gap-3'>
        <Breadcrumbs breadcrumbs={[
            {label: 'Grievances', href: '/grievances'},
            {label: 'Video-Gallery Videos', href: '/grievances/video-gallery/videos'},
            {label: (video?.title), href: `/grievances/video-gallery/playlist/${id}`, active: true},
        ]}/>
        <VideoPage params={params} fromVideoSection={true}/>
    </div>
}
