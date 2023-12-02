import {useChat} from "ai/react";
import {cn} from "@/lib/utils";
import {Bot, Trash, XCircle} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Message} from "ai";
import {useUser} from "@clerk/nextjs";
import Image from "next/image";
import {useEffect, useRef} from "react";

interface AiChatBotProps {
    open: boolean
    onClose: () => void
}

const AiChatBot = ({open, onClose}: AiChatBotProps) => {
    const {messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error} = useChat()
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])
    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
        }
    }, [open])

    const lastMessageIsUser = messages[messages.length - 1]?.role === 'user'

    return <div className={cn(
        'bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden'
    )}
    >
        <button onClick={onClose} className='mb-1 ms-auto block'>
            <XCircle size={30}/>
        </button>
        <div className='flex h-[600px] flex-col rounded bg-background border shadow-xl'>
            <div className='h-full mt-3 overflow-y-auto' ref={scrollRef}>
                {
                    messages.map((message) => (
                        <ChatMessage message={message} key={message.id}/>
                    ))
                }
                {
                    isLoading && lastMessageIsUser && (
                        <ChatMessage message={{role: 'assistant', content: '...thinking'}}/>
                    )
                }
                {
                    error && (
                        <ChatMessage message={{
                            role: 'assistant',
                            content: 'Something went wrong, please try again.!'
                        }}/>
                    )
                }
                {
                    !error && messages.length === 0 && (
                        <div className='flex h-full items-center justify-center gap-3'>
                            <Bot/>
                            Ask The Ai a question about your notes.
                        </div>
                    )
                }
            </div>
            <form onSubmit={handleSubmit} className='m-3 flex gap-1'>
                <Button title='Clear chat' variant='outline' size={"icon"} className={'shrink-0'} type='button'
                        onClick={() => setMessages([])}><Trash/></Button>
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Say something....'
                    ref={inputRef}
                />
                <Button type={"submit"}>Send</Button>
            </form>
        </div>
    </div>
}

export default AiChatBot
/**
 * when placing a customized msg, which has no id
 * instead of using
 * const ChatMessage = ({message: {role, content}}: { message: Message }) => {...}
 * use
 * const ChatMessage = ({message: {role, content}}: { message: Pick<Message, 'role'|'content' > }) => {...}
 * @param role
 * @param content
 * @constructor
 */
const ChatMessage = ({message: {role, content}}: { message: Pick<Message, 'role' | 'content'> }) => {
    /**
     * Get user image from ['https://img.clerk.com'], modify [next.config.js] too
     */
    const {user} = useUser()

    const isAiMessage = role === 'assistant'

    return <div className={cn(
        'mb-2 flex items-center',
        isAiMessage ? "justify-start me-5" : "justify-end ms-5"
    )}>
        {isAiMessage && <Bot className='mr-2 shrink-0'/>}
        <p className={cn(
            'whitespace-pre-line rounded-md border px3 py-2',
            isAiMessage ? 'bg-background' : 'bg-primary text-primary-foreground'
        )}>{content}</p>
        {!isAiMessage && user?.imageUrl && (
            <Image src={user.imageUrl} alt='user image' width={40} height={40}
                   className='ml-2 rounded-full w-10 h-10 object-cover'/>
        )}
    </div>
}
