import VideosSong from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/videos-song";
import PlayListSongs from "@/app/(homeNavBarPages)/grievances/video-gallery/[category]/[name]/playlist-songs";


interface PageProps {
    params: {
        videoUrl: null;
        name: string, category: string
    }

}

export default async function Page({params}: PageProps) {
    const isVideo = params.category.includes('videos')
    const ReturnValue = () => {
        return <div>
            {
                isVideo ? <VideosSong params={params}/> : <PlayListSongs params={params}/>
            }
        </div>
    }

    return (<ReturnValue/>)
}
