import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/loading-button";
import fetch from "node-fetch";
import {useRouter} from "next/navigation";
import {VideoGallery, VideoGalleryDescription} from ".prisma/client";
import {useState} from "react";
import {createVideoGallerySchema, CreateVideoGallerySchema} from "@/lib/validation/videoGallery";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {toast} from "@/components/ui/use-toast";


interface AddEditVideoDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    categories?: VideoGalleryDescription[]
    videoToEdit?: VideoGallery
    playlist?: VideoGalleryDescription
}

const AddEditVideoDialog = ({open, setOpen, videoToEdit, playlist, categories}: AddEditVideoDialogProps) => {
    const router = useRouter()

    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const [category, setCategory] = useState(playlist?.id ?? '')
    const [description, setDescription] = useState(playlist?.description ?? '')

    const form = useForm<CreateVideoGallerySchema>({
        resolver: zodResolver(createVideoGallerySchema),
        defaultValues: {
            title: videoToEdit?.title || '',
            url: videoToEdit?.url || '',
            categoryId: videoToEdit?.categoryId ?? category,
            description: videoToEdit?.description ?? description,
        }
    })

    async function onSubmit(input: CreateVideoGallerySchema) {
        try {
            if (videoToEdit) {
                const response = await fetch("/api/video", {
                    method: "PUT",
                    body: JSON.stringify({id: videoToEdit.id, ...input})
                })
                if (!response.ok) throw Error("Status code: " + response.status)
            } else {
                const response = await fetch("/api/video", {
                    method: 'POST',
                    body: JSON.stringify(input)
                })
                if (!response.ok) throw Error("Status code: " + response.status)
                form.reset()
            }
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(input, null, 2)}</code>
        </pre>
                ),
            })
            router.refresh()
            setOpen(false)
        } catch (e) {
            console.error(e)
            alert('Something went wrong, please try again.')
        }
    }

    async function deletePlaylist() {
        if (!videoToEdit) return
        setDeleteInProgress(true)
        try {
            const response = await fetch("/api/video/", {
                method: "DELETE",
                body: JSON.stringify({id: videoToEdit.id})
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
                            videoToEdit ? "Edit video" : "Add video"
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
                                    <FormLabel>Video title:</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"e.g Comedian Young Emma finally speaks out."} {...field}/>
                                    </FormControl>
                                    <FormMessage className='rounded-md  p-1 bg-destructive/20'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"url"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>YouTube url:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"eg. https://www.youtube.com/watch?v=YeD_YBubmUM"} {...field}/>
                                    </FormControl>
                                    <FormDescription>Get this link only from YouTube.</FormDescription>
                                    <FormMessage className='rounded-md  p-1 bg-destructive/20'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"categoryId"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Category:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={"eg. Local voices"}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Available playlists</SelectLabel>
                                                {
                                                    categories?.map((category) => (
                                                        <SelectItem key={category.id}
                                                                    value={category.id}>{category.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='rounded-md  p-1 bg-destructive/20'/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"description"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description:</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={"Describe the video"} {...field}/>
                                    </FormControl>
                                    <FormMessage className='rounded-md  p-1 bg-destructive/20'/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                videoToEdit && (
                                    <LoadingButton
                                        loading={deleteInProgress}
                                        variant='destructive'
                                        disabled={form.formState.isSubmitting}
                                        onClick={deletePlaylist}
                                        type='button'
                                    >
                                        Delete Playlist
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
export default AddEditVideoDialog
