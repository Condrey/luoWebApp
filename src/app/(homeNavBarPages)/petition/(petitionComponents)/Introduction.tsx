import {webPageName} from "@/lib/constants/Constants";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function Introduction() {
    return <div className='items-center justify-center flex flex-col gap-6'>
        <div className='max-w-prose flex flex-col gap-3 text-justify'>
            <span className='text-2xl'>{titleIntro}</span>
            <p className='whitespace-pre-line'>{introContent}</p>
        </div>

        <div className='max-w-prose flex flex-col gap-4 text-justify'>
            {
                inplorations.map((inploration) => (
                    <div key={inploration.title} className='flex flex-col gap-1'>
                        <span className='text-2xl'>{inploration.title}</span>
                        <p className='whitespace-pre-line'>{inploration.content}</p>
                    </div>
                ))
            }
        </div>

        <div className='flex flex-col gap-4 max-w-prose'>
            <Button variant={'destructive'}>
                Sign the petition
                <ArrowRight/>
            </Button>
            <p className='whitespace-pre-line max-w-prose text-center'>{conclusion}</p>
        </div>


    </div>
}

const titleIntro: string = 'Stand Up for Akii Bua - Sign the Petition'
const introContent: string = 'Dear Supporters,\n' +
    '\n' +
    'Welcome to our petition to rally support for the rightful location of the Akii Bua Stadium. The purpose of this petition is simple yet profound: we firmly believe that the stadium, honoring Uganda\'s first gold medalist, John Akii Bua, should be built in Lira, the heart of the Lango community.'
const conclusion: string = 'Thank you for being a crucial part of this movement.\n' +
    'Sincerely,\n' +
    `${webPageName}`
const inplorations: { title: string, content: string | undefined }[] = [
    {
        title: 'Why Lira?',
        content: 'Lira, as the ancestral home of John Akii Bua and a significant hub for the Langi community, holds deep cultural and historical ties to the celebrated athlete. It is only fitting that the stadium, bearing his name, stands proudly in the community that shaped him and that he proudly represented.'
    },
    {
        title: 'Our Grievance',
        content: 'Despite this natural and heartfelt connection, the government has decided to build the Akii Bua Stadium in Hoima district, a decision that has left us dismayed and disheartened. We believe that diverting the stadium away from its rightful home not only disrespects the legacy of John Akii Bua but also undermines the unity and pride of the Langi people.'
    },
    {
        title: 'Why Your Voice Matters',
        content: 'This petition is more than just signatures on a page; it is a collective voice that demands justice and respect for our cultural heritage. By adding your name, you are standing up for the rightful location of the Akii Bua Stadium in Lira, echoing the sentiments of a community that seeks to preserve its history and honor its heroes.'
    },
    {
        title: 'Join Us',
        content: 'We invite you to join this cause, to lend your voice to a movement that seeks to ensure that the legacy of John Akii Bua is rightfully celebrated in the community that nurtured him. Together, let\'s make it clear: No Akii Bua Stadium in Lira, No Votes, No AFCON in Uganda. Add your voice now and be a part of this impactful journey.'
    },
    {
        title: 'Sign the petition now and be the change.',
        content: undefined
    }
]
