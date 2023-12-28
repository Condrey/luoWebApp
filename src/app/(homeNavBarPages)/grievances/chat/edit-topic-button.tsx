'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import AddEditTopicDialog from "@/app/(homeNavBarPages)/grievances/chat/add-edit-topic-dialog";

interface EditTopicButtonProps {
    topicToEditJsonString: string
}

export default function EditTopicButton({topicToEditJsonString}: EditTopicButtonProps) {
    const topicToEdit = JSON.parse(topicToEditJsonString)
    const [showAddEditDialog, setShowAddEditDialog] = useState(false)
    return <>
        <Button variant='outline' className='bg-inherit' onClick={() => setShowAddEditDialog(true)}>
            <span>Edit My Topic</span>
        </Button>
        <AddEditTopicDialog open={showAddEditDialog} setOpen={setShowAddEditDialog} topicToEdit={topicToEdit}/>
    </>
}
