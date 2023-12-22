import {Input} from "@/components/ui/input";

export default function Page({params}: { params: { chat_id: string } }) {
    return <div className='flex flex-col h-full'>
        <div id='topic'>
            Topic {params.chat_id}
        </div>
        <div id='discussions' className='grow'>
            klndnlknldknlsknldknskl
        </div>
        <div id='reply zone'>
            <Input/>
        </div>

    </div>
}
