import prisma from "@/lib/db/prisma";
import PlayListContainer
    from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/playListContainer";
import AddPlaylistButton
    from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/addPlaylistButton";

export default async function PlaylistSection() {

    const allPlayLists = await prisma.videoGalleryDescription.findMany()


    return <div className='flex flex-col gap-2'>
        <span className='text-2xl font-bold'>Playlist</span>
        <div className='inline-flex'>
            <AddPlaylistButton/>

        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2'>
            {
                allPlayLists.length > 0
                    ? <>
                        {
                            allPlayLists.map((playlist) => (
                                    <PlayListContainer playlist={playlist} key={playlist.id}/>
                                )
                            )
                        }
                    </>
                    : <>
                        <div className='inline-flex flex-col max-w-sm gap-2'>
                            {"We don't have any playlists yet. Soon creating..."}
                        </div>
                    </>
            }
        </div>
    </div>
}