import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {Petition} from ".prisma/client";
import {useState} from "react";
import {createPetitionSchema, CreatePetitionSchema} from "@/lib/db/validation/petition";
import {Checkbox} from "@/components/ui/checkbox";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {createPetition, deletePetition, updatePetition} from "@/lib/db/actions/petition-action";
import {ServerMessage} from "@/lib/utils";


interface AddEditPetitionDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    petitionToEdit?: Petition
}

export default function AddEditPetitionDialog({open, setOpen, petitionToEdit}: AddEditPetitionDialogProps) {
    const router = useRouter()
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const form = useForm<CreatePetitionSchema>({
        resolver: zodResolver(createPetitionSchema),
        defaultValues: {
            district: petitionToEdit?.district || '',
            showDetails: petitionToEdit?.showDetails || false,
        }
    })


    async function onSubmit(input: CreatePetitionSchema) {
        try {
            if (petitionToEdit) {

                // const response = await axios.put("/api/petition", JSON.stringify({id: petitionToEdit.id, ...input}));
                // if (!response.data) {
                //     throw Error("Status code: " + response.status)
                // }
                const response: ServerMessage = await updatePetition({...input, id: petitionToEdit.id})
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
                // const response = await axios.post('/api/petition', JSON.stringify(input))
                // if (!response.data) {
                //     throw Error("Empty response data");
                // }
                const response: ServerMessage = await createPetition(input)
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

    async function deleteThisPetition() {
        if (!petitionToEdit) return
        setDeleteInProgress(true)
        try {
            // const response = await axios.delete(`/api/petition/${petitionToEdit.id}`)
            // if (!response.data) {
            //     throw Error("Empty response data");
            // }
            const response: ServerMessage = await deletePetition(petitionToEdit)
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
                            petitionToEdit ? "Edit Petition" : "Add Petition"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
                        <FormField
                            name={"district"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>District/ City:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"Please enter your district/ city for easy querying..."} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"showDetails"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem
                                    className="peer-has-[:checked]:ring-indigo-500 flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                                    <FormControl>
                                        <Checkbox className='peer'
                                                  checked={field.value}
                                                  onCheckedChange={field.onChange}/>
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className='cursor-pointer'>Show my details</FormLabel>
                                        <FormDescription>Visitors of the page will
                                            be able to view your name and image
                                            only</FormDescription>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                petitionToEdit && (
                                    <LoadingButton
                                        loading={deleteInProgress}
                                        variant='destructive'
                                        disabled={form.formState.isSubmitting}
                                        onClick={deleteThisPetition}
                                        type='button'
                                    >
                                        Delete Petition
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
