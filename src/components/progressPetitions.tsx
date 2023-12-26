import {Progress} from "@/components/ui/progress"
import {fetchPetitionNumber, fetchPetitionStatistics} from "@/lib/db/data/petition-data";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import AddPetitionButton from "@/app/(homeNavBarPages)/petition/(petitionComponents)/AddPetitionButton";
import {ArrowDownIcon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";


export default async function ProgressPetitions() {
    const numberOfPetitions = await fetchPetitionNumber()
    const numberOfPetitionsByDistrict = await fetchPetitionStatistics()
    const requiredNumber = 1000000
    const progress = numberOfPetitions / requiredNumber * 100
    return <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
            <span>Not yet signed? Sign here <ArrowDownIcon className='animate-bounce float-end mx-1'/></span>
            <AddPetitionButton/>
        </div>

        <div className='flex flex-col gap-4'>
            <span
                className='font-bold tracking-wider'>{`Goal for petition(${requiredNumber.toLocaleString()} signatures)`}</span>
            <span className='text-sm'>{`${numberOfPetitions.toLocaleString()} current signatures`}</span>
            <Progress value={progress} title='Goal of the petiton'/>
        </div>

        <div className='flex flex-col gap-4'>
            <span className='font-bold tracking-wider'>Leading districts/ cities</span>

            <Table>
                <TableCaption>5 top districts/ cities.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">District</TableHead>
                        <TableHead>Petition signatures</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        numberOfPetitionsByDistrict.map(item => (
                            <TableRow key={item.district}>
                                <TableCell className="font-medium">{item.district}</TableCell>
                                <TableCell>{item.number}</TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

        </div>
    </div>

}

export function TableRowSkeleton() {
    return <TableRow>
        <TableCell><Skeleton className='block w-full h-4'/> </TableCell>
        <TableCell><Skeleton className='block w-full h-4'/> </TableCell>
    </TableRow>
}

export function ProgressPetitionSkeleton() {

    return <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
            <span>Not yet signed? Sign here <Skeleton className='size-[18px]'/></span>
            <Skeleton className='block h-4'/>
        </div>

        <div className='flex flex-col gap-4'>
            <Skeleton className='h-4 block'/>
            <Skeleton className='h-4 w-full'/>
            <Skeleton className='
h5 w-2/3'/>
        </div>

        <div className='flex flex-col gap-4'>
            <span className='font-bold tracking-wider'>Leading districts/ cities</span>

            <Table>
                <TableCaption>5 top districts/ cities.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">District</TableHead>
                        <TableHead>Petition signatures</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRowSkeleton/>
                    <TableRowSkeleton/>
                    <TableRowSkeleton/>
                    <TableRowSkeleton/>
                    <TableRowSkeleton/>

                </TableBody>
            </Table>

        </div>
    </div>

}
