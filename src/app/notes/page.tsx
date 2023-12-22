import {Metadata} from "next";
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import NoteContainer from "@/components/NoteContainer";

const NotesPage = async () => {
    const {userId} = auth()
    if (!userId) {
        throw Error("userId undefined")
    }
    const allNotes = await prisma.note.findMany({where: {userId}})
    return <div className='grid gap-3  sm:grid-cols-2 xl:grid-cols-3 '>
        {
            allNotes.length > 0
                ? <>
                    {
                        allNotes.map((note) => (
                                <NoteContainer note={note} key={note.id}/>
                            )
                        )
                    }
                </>
                : <>
                    <div className='col-span-full text-center'>{"You don't have any notes yet. Why don't you add one"}</div>
                </>
        }

    </div>
}
export default NotesPage
export const metadata: Metadata = {
    title: `{webPageName}`
}
