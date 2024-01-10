import { fetchPlaylistsWithVideos } from "@/lib/db/data/playlist-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import AddPlaylistButton from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/addPlaylistButton";
import EditPlaylistButton from "@/app/(homeNavBarPages)/grievances/video-gallery/(videoGallerySections)/editPlaylistButton";

export default async function Page() {
  const playlists = await fetchPlaylistsWithVideos();
  return (
    <>
      <span>{`List of playlists (${playlists.length.toLocaleString()})`}</span>
      <Table className="max-w-2xl border">
        <TableHeader>
          <TableHead>#</TableHead>
          <TableHead>Poster</TableHead>
          <TableHead>Playlist</TableHead>
          <TableHead>No. of Videos</TableHead>
          <TableHead>Action</TableHead>
        </TableHeader>
        <TableBody>
          {playlists.map((playlist, index) => (
            <TableRow key={playlist.id} className="odd:bg-accent">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={playlist.poster!}
                  alt={playlist.name}
                  width={25}
                  height={25}
                />
              </TableCell>
              <TableCell>{playlist.name}</TableCell>
              <TableCell>{playlist.videoGalleries.length.toString()}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <AddPlaylistButton />
                  <EditPlaylistButton playlistToEdit={playlist} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
