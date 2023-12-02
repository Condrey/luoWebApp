import {useForm} from "react-hook-form";
import {createNoteSchema, CreateNoteSchema} from "@/lib/validation/note";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/loading-button";
import fetch from "node-fetch";
import {useRouter} from "next/navigation";
import {Note} from ".prisma/client";
import {useState} from "react";

interface AddEditNotesDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    noteToEdit?: Note
}

const AddEditNotesDialog = ({open, setOpen, noteToEdit}: AddEditNotesDialogProps) => {
    const router = useRouter()
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const form = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: noteToEdit?.title || '',
            content: noteToEdit?.content || '',
        }
    })


    async function onSubmit(input: CreateNoteSchema) {
        try {
            if (noteToEdit) {
                const response = await fetch("/api/notes", {
                    method: "PUT",
                    body: JSON.stringify({id: noteToEdit.id, ...input})
                })
                if (!response.ok) throw Error("Status code: " + response.status)
            } else {
                const response = await fetch("/api/notes", {
                    method: 'POST',
                    body: JSON.stringify(input)
                })
                if (!response.ok) throw Error("Status code: " + response.status)
                form.reset()
            }
            router.refresh()
            setOpen(false)
        } catch (e) {
            console.error(e)
            alert('Something went wrong, please try again.')
        }
    }

    async function deleteNote() {
        if (!noteToEdit) return
        setDeleteInProgress(true)
        try {
            const response = await fetch("/api/notes/", {
                method: "DELETE",
                body: JSON.stringify({id: noteToEdit.id})
            })
            if (!response.ok) throw Error("Status code: " + response.status)
            router.refresh()
            setOpen(false)
        } catch (e) {
            console.error(e)
            alert('Something went wrong, please try again.')
        } finally {
            setDeleteInProgress(false)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            noteToEdit ? "Edit Note" : "Add Note"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
                        <FormField
                            name={"title"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Note title:</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Note title"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"content"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Note content:</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={"Note content"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                noteToEdit && (
                                    <LoadingButton
                                        loading={deleteInProgress}
                                        variant='destructive'
                                        disabled={form.formState.isSubmitting}
                                        onClick={deleteNote}
                                        type='button'
                                    >
                                        DeleteNote
                                    </LoadingButton>
                                )
                            }
                            <LoadingButton
                                loading={form.formState.isSubmitting}
                                type={"submit"}
                                disabled={deleteInProgress}
                            >
                                Submit
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default AddEditNotesDialog
