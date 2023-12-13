import VideoPage from "@/components/video-page";

interface PageProps {
    params: { videoUrl: string }
}

export default function Page({params}: PageProps) {
    return <div>
        <VideoPage params={params}/>
    </div>
}
