// import johnAkiiBuaImage2 from '@/assets/show-photo-icon-mobile.jpg'

import {SpeakerIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function NamingStadium() {
    return <div
        className='flex flex-col max-w-7xl items-center justify-center py-3 px-6 gap-6 text-justify'>
        <div className='flex flex-col max-w-prose gap-1'>
            <span className='text-2xl font-bold uppercase text-start text-balance'>{title}</span>
            <p>{introduction}</p>
        </div>
        <div className='flex flex-col gap-3 md:gap-6 max-w-prose '>
            {reasons.map((reason) => (
                <div key={reason.title} className='flex flex-col gap-1 md:gap-2'>
                    <span className='text-2xl font-bold'>{reason.title}</span>
                    <p>{reason.content}</p>
                </div>
            ))}
        </div>
        <div className='max-w-prose'>
            <p>{conclusion}</p>
        </div>
        <div className='flex flex-col max-w-prose gap-4 pt-6 py-3'>
            <div>
                <Badge variant='secondary' className='text-3xl inline-flex gap-2'> <SpeakerIcon/> Voices</Badge>
            </div>

            {quotes.map((quote) => (
                <div key={quote.title}>
                    <span className='text-2xl'>{quote.title}</span>
                    <p className='indent-8 py-3'>{quote.content}</p>
                </div>

            ))}
        </div>
    </div>
}

const title: string = 'Stadium Naming Significance: Honoring John Akii Bua'
const introduction: string = 'In the heart of East Africa, amidst the rich tapestry of Uganda, lies the profound legacy of John Akii Bua—an athlete whose achievements transcended the boundaries of sport, resonating deeply within the Lango community.'
const conclusion: string = 'By naming the stadium "Akii Bua," we pay homage to a cultural icon, a historical trailblazer, and a source of inspiration. It is not just a name on a structure; it is a commitment to preserving and celebrating our rich heritage for the world to witness.'
const reasons: { title: string, content: string }[] = [
    {
        title: 'Cultural Tapestry',
        content: 'John Akii Bua, a proud Luo and Langi by tribe, etched his name into the annals of history as Uganda\'s first Olympic gold medalist. His journey from the humble roots of Lira to the global stage exemplifies the resilience, determination, and unwavering spirit that define the Lango people. By naming the stadium "Akii Bua," we weave the threads of culture, identity, and triumph into the very fabric of our community.'
    },
    {
        title: 'Historical Milestone',
        content: 'The decision to name the stadium after John Akii Bua is not merely symbolic; it is a celebration of a historical milestone. Akii Bua\'s victory in the 400m hurdles at the 1972 Munich Olympics not only brought pride to Uganda but also shattered barriers, showcasing the excellence that can emerge from our midst.'
    },
    {
        title: 'Inspiration for Generations',
        content: 'Naming the stadium after Akii Bua is an investment in inspiration. The story of his achievements becomes a beacon for the youth, a reminder that dreams, no matter how audacious, are within reach. It is a testament to the fact that a small community can produce giants who leave an indelible mark on the world stage.'
    },
    {
        title: 'Unity and Pride',
        content: 'The naming of the stadium is an opportunity for the Lango community to unite in pride. It is a declaration that our heroes, like Akii Bua, deserve to be honored on a grand scale, providing a sense of identity and belonging for generations to come.'
    },
]
const quotes: { title: string, content: string }[] = [
    {
        title: 'Community Perspective',
        content: '"John Akii Bua\'s legacy is our legacy. Building the stadium in Lira is not just about bricks and mortar; it\'s about preserving our heritage and honoring a true hero."'
    },
    {
        title: 'Athletic Achievement',
        content: '"In the hurdles of life, John Akii Bua cleared barriers and brought gold to Uganda. Naming the stadium after him in Lira is a testament to the triumph of the human spirit."'
    },
    {
        title: 'Unity and Identity',
        content: '"Our identity as a community is intertwined with John Akii Bua. Let the Akii Bua Stadium stand tall in Lira, a symbol of unity and a beacon of inspiration for generations to come."'
    },
    {
        title: 'Local Support',
        content: '"In Lira, the heartbeat of Akii Bua echoes through the hills. Building the stadium here is not just a choice; it\'s a commitment to our roots and a promise to future athletes."'
    },
]
