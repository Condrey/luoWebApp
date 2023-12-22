"use client"

import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {useState} from "react";
import AddEditPetitionDialog from "@/app/(homeNavBarPages)/petition/(petitionComponents)/addEditPetitionDialog";
import {Petition} from ".prisma/client";


export default function EditPetitionButton({petition}: { petition: Petition }) {
    const [showAddEditDialog, setShowAddEditDialog] = useState(false)

    return <>
        <Button variant='destructive' onClick={() => setShowAddEditDialog(true)} className='rounded-full'>
            <Pencil/>
        </Button>
        <AddEditPetitionDialog open={showAddEditDialog} setOpen={setShowAddEditDialog} petitionToEdit={petition}/>
    </>
}
