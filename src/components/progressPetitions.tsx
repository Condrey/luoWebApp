import {Progress} from "@/components/ui/progress"
import {fetchPetitionNumber, fetchPetitionStatistics} from "@/lib/db/data/petition-data";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import AddPetitionButton from "@/app/(homeNavBarPages)/petition/(petitionComponents)/AddPetitionButton";
import {ArrowDownIcon} from "lucide-react";


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
