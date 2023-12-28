import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {ServerMessage} from "@/lib/utils";
import {createTopicSchema, CreateTopicSchema} from "@/lib/db/validation/topic";
import {Topic} from "@prisma/client";
import {createTopic, deleteTopic, updateTopic} from "@/lib/db/actions/topic-action";
import {Textarea} from "@/components/ui/textarea";


interface AddEditTopicDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    topicToEdit?: Topic
}

export default function AddEditTopicDialog({open, setOpen, topicToEdit}: AddEditTopicDialogProps) {
    const router = useRouter()
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const form = useForm<CreateTopicSchema>({
        resolver: zodResolver(createTopicSchema),
        defaultValues: {
            title: topicToEdit?.title || '',
        }
    })


    async function onSubmit(input: CreateTopicSchema) {
        try {
            if (topicToEdit) {
                const response: ServerMessage = await updateTopic({...input, id: topicToEdit.id})
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

                const response: ServerMessage = await createTopic(input)
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

    async function deleteThisTopic() {
        if (!topicToEdit) return
        setDeleteInProgress(true)
        try {
            const response: ServerMessage = await deleteTopic(topicToEdit)
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
                            topicToEdit ? "Edit Topic" : "Add Topic"
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
                                    <FormLabel>Title:</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={"Type discussion title..."} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                topicToEdit && (
                                    <LoadingButton
                                        loading={deleteInProgress}
                                        variant='destructive'
                                        disabled={form.formState.isSubmitting}
                                        onClick={deleteThisTopic}
                                        type='button'
                                    >
                                        Delete Title
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
