import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import PlaylistSection from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/playlist";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import NavigateBack from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/navigate-back";

interface VideoGalleryProps {
    params?: { category: string }
}

export default function VideoGallery({params}: VideoGalleryProps) {
    const category = params?.category

    return <div className='flex flex-col gap-3'>
        <NavigateBack/>
        <Tabs defaultValue={category ?? 'playlist'} className='flex flex-col items-center justify-center'>
            <TabsList>
                <TabsTrigger value="playlist">All playlists</TabsTrigger>
                <TabsTrigger value="videos">All videos</TabsTrigger>
            </TabsList>
            <TabsContent value="playlist">
                <PlaylistSection/>
            </TabsContent>
            <TabsContent value="videos">Change your password here.</TabsContent>
        </Tabs>
        <div className='absolute bottom-3 right-3'>
            <Button variant='destructive'>
                <PlusIcon className='mr-2'/>
                Add Video
            </Button>
        </div>

    </div>
}
export const metadata = {
    title: `Grievances: Categorized videos expressing local grievances.`
}
