import {useState} from "react";
import AiChatBot from "@/components/AiChatBot";
import {Button} from "@/components/ui/button";
import {Bot} from "lucide-react";

const AiChatButton = () => {
    const [chatBotOpen, setChatBotOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setChatBotOpen(true)}>
                <Bot size={20} className='mr-2'/>
                Ai Chat
            </Button>
            <AiChatBot open={chatBotOpen} onClose={() => setChatBotOpen(false)}/>
        </>
    )
}
export default AiChatButton
