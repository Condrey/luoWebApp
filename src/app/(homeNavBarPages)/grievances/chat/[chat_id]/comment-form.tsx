'use client'
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateCommentSchema, createCommentSchema} from "@/lib/db/validation/topic";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {Input} from "@/components/ui/input";
import {LucideSend} from "lucide-react";
import {cn, ServerMessage} from "@/lib/utils";
import {createComment} from "@/lib/db/actions/comment-action";
import {toast} from "@/components/ui/use-toast";

interface CommentFormProps {
    topicId: string | undefined
}

export default function CommentForm({topicId}: CommentFormProps) {
    const router = useRouter()
    const form = useForm<CreateCommentSchema>({
        resolver: zodResolver(createCommentSchema),
        defaultValues: {
            comment: '',
            topicId
        }
    })

    async function onSubmit(input: CreateCommentSchema) {
        console.log('submitting...')
        try {
            const response: ServerMessage = await createComment(input)
            toast({
                title: response.title!,
                description: response.message,
                className: cn(response.type === 'success' && 'hidden'),
                variant: response.type === 'error' ? 'destructive' : 'default'
            })
            form.reset()
            router.refresh()
        } catch (e) {
            console.error(e)
            toast({
                title: 'Warning!',
                description: 'Something went wrong, please try again.',
                variant: 'destructive'

            })
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 flex items-end">
            <div className='grow'>
                <FormField
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormMessage/>
                            <FormControl>
                                <Input placeholder={'Comment here ...'}{...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    name={'comment'}
                />
            </div>

            <LoadingButton loading={form.formState.isSubmitting} type='submit'
                           variant='destructive' className='p-2 float-right rounded-full md:rounded-md'><span
                className='hidden md:flex'>Reply</span> <LucideSend className='rotate-45 md:mr-1'/></LoadingButton>
        </form>
    </Form>
}
