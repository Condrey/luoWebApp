import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/loading-button";
import fetch from "node-fetch";
import {useRouter} from "next/navigation";
import {VideoGalleryDescription} from ".prisma/client";
import {useState} from "react";
import {createVideoPlaylistSchema, CreateVideoPlaylistSchema} from "@/lib/validation/videoGalleryDescription";


interface AddEditPlaylistDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    playListToEdit?: VideoGalleryDescription
}

const AddEditPlaylistDialog = ({open, setOpen, playListToEdit}: AddEditPlaylistDialogProps) => {
    const router = useRouter()
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const form = useForm<CreateVideoPlaylistSchema>({
        resolver: zodResolver(createVideoPlaylistSchema),
        defaultValues: {
            name: playListToEdit?.name || '',
            description: playListToEdit?.description || '',
            poster: playListToEdit?.poster || '',
        }
    })


    async function onSubmit(input: CreateVideoPlaylistSchema) {
        try {
            if (playListToEdit) {
                const response = await fetch("/api/playlist", {
                    method: "PUT",
                    body: JSON.stringify({id: playListToEdit.id, ...input})
                })
                if (!response.ok) throw Error("Status code: " + response.status)
            } else {
                const response = await fetch("/api/playlist", {
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

    async function deletePlaylist() {
        if (!playListToEdit) return
        setDeleteInProgress(true)
        try {
            const response = await fetch("/api/playlist/", {
                method: "DELETE",
                body: JSON.stringify({id: playListToEdit.id})
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
                            playListToEdit ? "Edit Playlist" : "Add Playlist"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
                        <FormField
                            name={"name"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Playlist name:</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Enter name of playlist"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"poster"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Poster url:</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"Poster Url"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
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
                                        <Textarea placeholder={"Describe the playlist"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='gap-1 sm:gap-0'>
                            {
                                playListToEdit && (
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
export default AddEditPlaylistDialog
