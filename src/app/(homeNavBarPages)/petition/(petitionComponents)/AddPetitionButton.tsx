import {hasUserSignedPetition} from "@/lib/db/data/petition-data";
import PetitionButton from "@/app/(homeNavBarPages)/petition/(petitionComponents)/PetitionButton";
import {Badge} from "@/components/ui/badge";
import {CheckCheckIcon} from "lucide-react";


export default async function AddPetitionButton() {
    const isUserSignedPetition = await hasUserSignedPetition()
    return <div>
        {
            isUserSignedPetition ?
                <Badge className='py-2 font-bold'><CheckCheckIcon className='mr-1'/>You already Signed, thank
                    you.</Badge>
                : <PetitionButton/>}
    </div>

}
