"use client"
import {Note as NoteModel} from "@prisma/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";
import AddEditNotesDialog from "@/components/AddEditNotesDialog";

interface NoteContainerProps {
    note: NoteModel
}

const NoteContainer = ({note}: NoteContainerProps) => {
    const [showEditDialog, setShowEditDialog] = useState(false)
    const wasUpdated = note.updatedAt > note.createdAt
    const createdUpdatedAtTimestamp = (
        wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString()
    return (
        <>
            <Card className='cursor-pointer transition-shadow hover:shadow-lg' onClick={() => setShowEditDialog(true)}>
                <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>
                        {createdUpdatedAtTimestamp}
                        {wasUpdated && " (updated)"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='whitespace-pre-line'>{note.content}</p>
                </CardContent>
            </Card>
            <AddEditNotesDialog open={showEditDialog} setOpen={setShowEditDialog} noteToEdit={note}/>
        </>
    )
}
export default NoteContainer
