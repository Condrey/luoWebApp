"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const CommentSection = () => {
    return <div className='p-5 w-full dark:bg-hero-pattern  bg-contain bg-repeat-x '>
        <div className='text-center  text-5xl text-primary dark:text-secondary  font-black w-auto p-5'>GRIEVANCES</div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            <Card className='w-auto'>
                <CardHeader className='flex flex-col justify-center items-center '>
                    <div
                        className='w-32 h-32  rounded-full outline outline-amber-700 -outline-offset-4 space-y-12 '>

                    </div>
                    <div className='text-center'>
                        <CardTitle>Hon. Akena Obote</CardTitle>
                        <CardDescription>{new Date(Date.now()).toLocaleDateString()}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className='line-clamp-3'>
                    We are grieving seriously for this misfortune. This is a complete breach of contract, and we as the
                    Luo
                    are very eager waiting for the amendment of this act....
                </CardContent>
            </Card>

        </div>
    </div>
}
export default CommentSection
