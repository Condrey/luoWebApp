'use client'
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import AddEditQuotationDialog from "@/app/(homeNavBarPages)/grievances/quotations/add-edit-quotation-dialog";

export default function AddQuotationButton() {
    const [showAddEditDialog, setShowAddEditDialog] = useState(false)

    return <>
        <Button variant='destructive' onClick={() => setShowAddEditDialog(true)}>
            <PlusIcon/>
            Add Quote
        </Button>
        <AddEditQuotationDialog open={showAddEditDialog} setOpen={setShowAddEditDialog}/>
    </>
}
