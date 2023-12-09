import {Info, ListVideo} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";


interface PlayListSongsProps {
    params: { name: string }
}

export default function PlayListSongs({params}: PlayListSongsProps) {
    const playListName = params.name

    return <div className='flex flex-col gap-3'>
        <div className='text-2xl font-bold flex items-center gap-2'>
            <ListVideo/>
            <span>{playListName}</span>
        </div>
        <Alert>
            <Info className="h-4 w-4"/>
            <AlertTitle>Description</AlertTitle>
            <AlertDescription>
                You can add components and dependencies to your app using the CLI mm.
            </AlertDescription>
        </Alert>


    </div>
}
