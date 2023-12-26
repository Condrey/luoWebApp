'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import AddEditTopicDialog from "@/app/(homeNavBarPages)/grievances/chat/add-edit-topic-dialog";

export default function AddTopicButton() {
    const [showAddEditDialog, setShowAddEditDialog] = useState(false)

    return <>
        <Button variant='outline' className='bg-inherit' onClick={() => setShowAddEditDialog(true)}>
            <span>New Topic</span>
        </Button>
        <AddEditTopicDialog open={showAddEditDialog} setOpen={setShowAddEditDialog}/>
    </>
}
