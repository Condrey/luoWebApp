import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {ServerMessage} from "@/lib/utils";
import {createCommentSchema, CreateCommentSchema} from "@/lib/db/validation/topic";
import {TopicComment} from "@prisma/client";
import {Textarea} from "@/components/ui/textarea";
import {createComment, deleteComment, updateComment} from "@/lib/db/actions/comment-action";


interface AddEditCommentDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    commentToEdit: TopicComment
}

export default function AddEditCommentDialog({open, setOpen, commentToEdit}: AddEditCommentDialogProps) {
    const router = useRouter()
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const form = useForm<CreateCommentSchema>({
        resolver: zodResolver(createCommentSchema),
        defaultValues: {
            comment: commentToEdit?.comment || '',
        }
    })


    async function onSubmit(input: CreateCommentSchema) {
        try {
            if (commentToEdit) {
                const response: ServerMessage = await updateComment({...input, id: commentToEdit.id})
                toast({
                    title: response.title !,
                    description: (
                        <span className='whitespace-pre-line'>
                            {response.message}
                        </span>
                    ),
                    variant: response.type === 'error' ? 'destructive' : 'default',
                })

            } else {

                const response: ServerMessage = await createComment(input)
                toast({
                    title: response.title !,
                    description: (
                        <span className='whitespace-pre-line'>
                            {response.message}
                        </span>
                    ),
                    variant: response.type === 'error' ? 'destructive' : 'default',
                })

                form.reset()
            }
            router.refresh()
            setOpen(false)
        } catch (e) {
            console.error(e)
            toast({
                title: 'Warning!',
                description: 'Something went wrong, please try again.',
                variant: 'destructive'

            })

        }
    }

    async function deleteThisComment() {
        if (!commentToEdit) return
        setDeleteInProgress(true)
        try {
            const response: ServerMessage = await deleteComment(commentToEdit)
            toast({
                title: response.title!,
                description: (

                    <span className='whitespace-pre-line'>
                            {response.message}
                        </span>
                ),
                variant: 'destructive',
            })

            router.refresh()
            setOpen(false)
        } catch (e) {
            console.error(e)
            toast({
                title: 'Warning!',
                description: 'Something went wrong, please try again.',
                variant: 'destructive'
            })
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
                            commentToEdit ? "Edit Comment" : "Add Comment"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
                        <FormField
                            name={"comment"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Comment:</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={"Reply here..."} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                commentToEdit && (
                                    <LoadingButton
                                        loading={deleteInProgress}
                                        variant='destructive'
                                        disabled={form.formState.isSubmitting}
                                        onClick={deleteThisComment}
                                        type='button'
                                    >
                                        Delete Comment
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
