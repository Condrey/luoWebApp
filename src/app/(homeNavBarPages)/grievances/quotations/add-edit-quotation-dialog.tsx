import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {Quotations} from ".prisma/client";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {createQuotationSchema, CreateQuotationSchema} from "@/lib/db/validation/quotation";
import {createQuotation, deleteQuotation, updateQuotation} from "@/lib/db/actions/quotation-action";
import {Textarea} from "@/components/ui/textarea";


interface AddEditQuotationDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    quotationToEdit?: Quotations
}

export default function AddEditQuotationDialog({open, setOpen, quotationToEdit}: AddEditQuotationDialogProps) {
    const router = useRouter()
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const form = useForm<CreateQuotationSchema>({
        resolver: zodResolver(createQuotationSchema),
        defaultValues: {
            title: quotationToEdit?.title || '',
            content: quotationToEdit?.content || '',
            occupation: quotationToEdit?.occupation || '',
        }
    })


    async function onSubmit(input: CreateQuotationSchema) {
        try {
            if (quotationToEdit) {

                const response = await updateQuotation(input)
                toast({
                    description: (
                        <span className='whitespace-pre-line'>
                            {response.message ? response.message : 'Edit success.!'}
                        </span>
                    ),
                    variant: response.message ? 'destructive' : 'default',
                })
            } else {
                const response = await createQuotation(input)

                toast({
                    description: (
                        <span className='whitespace-pre-line'>
                            {response.message ? response.message : 'Added successfully.!'}
                        </span>
                    ),
                    variant: response.message ? 'destructive' : 'default',
                })

                form.reset()
            }
            router.refresh()
            setOpen(false)
        } catch (e) {
            console.error(e)
            toast({
                title: 'Warning!',
                description: 'Something went wrong, please try again.'
            })

        }
    }

    async function deleteThisQuotation() {
        if (!quotationToEdit) return
        setDeleteInProgress(true)
        try {
            const response = await deleteQuotation(quotationToEdit)
            toast({
                description: (
                    <span className='whitespace-pre-line'>
                            {response.message ? response.message : 'Deleted successfully.!'}
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
                description: 'Something went wrong, please try again.'
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
                            quotationToEdit ? "Edit Quotation" : "Add Quotation"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
                        <FormField
                            name={'title'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"Title of Quotation..."} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={'occupation'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Your Occupation:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"Title of Quotation..."} {...field}/>
                                    </FormControl>
                                    <FormDescription>This field is optional</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={'content'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Quote:</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={"Enter your quote here..."} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                quotationToEdit && (
                                    <LoadingButton
                                        loading={deleteInProgress}
                                        variant='destructive'
                                        disabled={form.formState.isSubmitting}
                                        onClick={deleteThisQuotation}
                                        type='button'
                                    >
                                        Delete Quotation
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
