'use client'
import {useState} from "react";
import AddEditPetitionDialog from "@/app/(homeNavBarPages)/petition/(petitionComponents)/addEditPetitionDialog";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function PetitionButton() {
    const [showAddEditDialog, setShowAddEditDialog] = useState(false)

    return <>
        <Button variant='destructive' onClick={() => setShowAddEditDialog(true)}>
            <span className='grow peer'>Sign your Petition</span>
            <ArrowRight className="ml-2 peer-hover:translate-x-2 hover:translate-x-2"/>
        </Button>
        <AddEditPetitionDialog open={showAddEditDialog} setOpen={setShowAddEditDialog}/>
    </>
}
