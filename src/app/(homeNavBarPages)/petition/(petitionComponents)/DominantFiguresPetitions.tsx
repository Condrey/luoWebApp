import {fetchPetitionNumber, fetchPetitions} from "@/lib/db/data/petition-data";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";

export default async function DominantFiguresPetitions() {
    const petitions = await fetchPetitions()
    const numberOfPetitions = await fetchPetitionNumber()
    const otherPetitions: number | null = petitions.length === 9 ? Math.ceil(numberOfPetitions - petitions.length) : null
    return <div className='flex flex-col gap-3'>
        <span className='text-2xl font-bold'>Also signed By:</span>
        <span className=''>NB: Only people who signed the petition with <strong
            className=' inline-flex gap-1 items-center justify-center before:content-check-box  '>Show
            my
            details</strong> , will
            appear
            here.</span>
        <div
            className=' grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4'>
            {
                petitions.map((petition) => (
                    <div key={petition.id}
                         className='flex flex-col gap-2 rounded-md p-3 items-center  bg-blue-200  dark:bg-fuchsia-900/20  border border-b-fuchsia-300 dark:border-b-fuchsia-900/50'>
                        <Avatar className='w-[85px] h-[85px]'>
                            <AvatarImage src={petition.user.imageUrl}/>
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className='mb-4'>{`${petition.user.firstName} ${petition.user.lastName}`}</span>
                        <span>{petition.district}</span>
                        <span>{petition.createdAt}</span>
                    </div>
                ))
            }
            <Badge variant='secondary' className='text-2xl'>
                {`+${otherPetitions!.toLocaleString()} total signature${otherPetitions === 1 ? '' : 's'}`}
            </Badge>
        </div>
    </div>
}

export function DominantFiguresPetitionsSkeleton() {
    return <div className='flex flex-col gap-3'>
        <span className='text-2xl font-bold'>Also signed By:</span>
        <span className=''>NB: Only people who signed the petition with <strong
            className=' inline-flex gap-1 items-center justify-center before:content-check-box  '>Show
            my
            details</strong> , will
            appear
            here.</span>
        <div
            className=' grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4'>
            {
                Array.from({length: 12}, (_, index) => (
                    <div key={index}
                         className='flex flex-col gap-2 rounded-md p-3 items-center  bg-blue-200  dark:bg-fuchsia-900/20  border border-b-fuchsia-300 dark:border-b-fuchsia-900/50'>
                        <Skeleton className='size-[85px] rounded-full'/>
                        <Skeleton className='mb-4 h-4 w-12'/>
                        <Skeleton className='w-8 h-4'/>
                        <Skeleton className='w-8 h-2'/>
                    </div>
                ))
            }
            <Skeleton className='w-10 h-10'/>
        </div>
    </div>
}
