'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import AddEditCommentDialog from "@/app/(homeNavBarPages)/grievances/chat/[chat_id]/add-edit-comment-dialog";

interface EditCommentButtonProps {
    commentToEditJsonString: string
}

export default function EditCommentButton({commentToEditJsonString}: EditCommentButtonProps) {
    const commentToEdit = JSON.parse(commentToEditJsonString)
    const [showAddEditDialog, setShowAddEditDialog] = useState(false)
    return <>
        <Button variant='outline' className='bg-inherit' onClick={() => setShowAddEditDialog(true)}>
            <span>Edit My Comment</span>
        </Button>
        <AddEditCommentDialog open={showAddEditDialog} setOpen={setShowAddEditDialog} commentToEdit={commentToEdit}/>
    </>
}
