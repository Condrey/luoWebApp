import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {populateCounter} from "@/lib/db/data/petition-data";
import {Skeleton} from "@/components/ui/skeleton";

export default async function PetitionGrievanceCounter() {
    const {numberOfPetitions, numberOfPlaylists, numberOfTopics, numberOfVideos} = await populateCounter()


    return <div className='flex flex-col gap-6'>
        <span className='text-balance text-2xl font-bold text-center'>Current Standing</span>
        <div className='flex flex-row gap-2 px-2 items-center justify-center'>
            <Card className='flex flex-col-reverse md:flex-col border-2  px-2 md:px-5'>
                <CardHeader className='flex flex-col md:flex-row items-center justify-center gap-3 py-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <CardTitle>{numberOfPlaylists.toLocaleString()}</CardTitle>
                        <CardDescription>Playlists</CardDescription>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <CardTitle>{numberOfVideos.toLocaleString()}</CardTitle>
                        <CardDescription>Videos</CardDescription>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <CardTitle>{numberOfTopics.toLocaleString()}</CardTitle>
                        <CardDescription>Topics</CardDescription>
                    </div>
                </CardHeader>
                <CardHeader className='flex flex-col items-center'>
                    <CardTitle>Grievances</CardTitle>
                </CardHeader>


            </Card>

            <Card
                className='border-2  px-2 md:px-5'>
                <CardHeader className='flex flex-col items-center'>
                    <CardTitle>{numberOfPetitions.toLocaleString()} </CardTitle>
                    <CardDescription>Signatures</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                    <CardTitle>Petitions</CardTitle>
                </CardContent>
            </Card>
        </div>
    </div>
}

export function PetitionGrievanceCounterSkeleton() {


    return <div className='flex flex-col gap-6'>
        <span className='text-balance text-2xl font-bold text-center'>Current Standing</span>
        <div className='flex flex-row gap-2 px-2 items-center justify-center'>
            <Card className='flex flex-col-reverse md:flex-col border-2  px-2 md:px-5'>
                <CardHeader className='flex flex-col md:flex-row items-center justify-center gap-3 py-2'>
                    <div className='flex flex-col justify-center items-center gap-2 w-1/3'>
                        <Skeleton className='h-6 w-2/3'/>
                        <Skeleton className='h-4 w-1/2'/>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 w-1/3'>
                        <Skeleton className='h-6 w-2/3'/>
                        <Skeleton className='h-4 w-1/2'/>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 w-1/3'>
                        <Skeleton className='h-6 w-2/3'/>
                        <Skeleton className='h-4 w-1/2'/>
                    </div>
                </CardHeader>
                <CardHeader className='flex flex-col items-center'>
                    <CardTitle>Grievances</CardTitle>
                </CardHeader>


            </Card>

            <Card
                className='border-2  px-2 md:px-5'>
                <CardHeader className='flex flex-col items-center'>
                    <Skeleton className='h-6 w-2/3'/>
                    <Skeleton className='h-4 w-1/2'/>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                    <CardTitle>Petitions</CardTitle>
                </CardContent>
            </Card>
        </div>
    </div>
}
