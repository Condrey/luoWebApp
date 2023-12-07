import Image from "next/image";
import johnAkiiBuaImage1 from '@/assets/akii_bua-desktop.jpg'
// import johnAkiiBuaImage2 from '@/assets/show-photo-icon-mobile.jpg'

export default function Introduction() {
    return <div className='flex items-center justify-center my-5 px-2 w-full '>
        <div className=' bg-slate-400/5 dark:bg-slate-900/75   py-2 px-6 rounded text-slate-900 dark:text-slate-50'>
            <Image src={johnAkiiBuaImage1} alt={'Image of John Akii Bua'}
                   className='w-[150px] sm:w-auto max-w-xs rounded-md float-left mr-2 sm:mr-4 mb-4'/>
            <p className='max-w-prose whitespace-pre-line break-words'>{introductionText}</p>
            <div className='max-w-prose flex flex-col gap-5 mt-5'>
                {
                    biography.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2'>
                            <span className='text-2xl  font-bold'>{item.title}</span>
                            {item.content}
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}

const biography: { title: string, content: string }[] = [
    {
        title: 'Early Life',
        content: 'John Akii Bua was born on December 3, 1949, in Abako Village, Lira District, Uganda. Growing up in a small village, he displayed exceptional athletic abilities from a young age.'
    }, {
        title: 'Athletic Journey',
        content: 'Akii Bua\'s journey to greatness began in the world of track and field. He specialized in the 400 meters hurdles, an event that would become synonymous with his name. His unmatched speed, agility, and determination set him apart as a rising star in the international athletics scene.'
    }, {
        title: 'Olympic Triumph',
        content: 'The pinnacle of Akii Bua\'s career came at the 1972 Munich Olympics. In a historic and breathtaking performance, he not only secured the gold medal in the 400 meters hurdles but also set a new world record with a time of 47.82 seconds. This victory marked a groundbreaking moment for Uganda, as Akii Bua became the first athlete from the country to win an Olympic gold medal.'
    }, {
        title: 'Significance to Lango Community',
        content: 'Beyond his athletic prowess, John Akii Bua was a proud member of the Lango community, belonging to the Luo and Langi tribes. His achievements served as a source of immense pride for the local population, inspiring generations to come.'
    }, {
        title: 'Legacy and Impact',
        content: 'Tragically, John Akii Bua\'s life was cut short at the age of 47 in 1997. However, his legacy endures as an icon of resilience, determination, and the indomitable spirit of the Ugandan people.'
    }
]
const introductionText: string =
    'Welcome to the heart of our campaign, where the spirit of a legendary athlete meets the aspirations of a community. ' +
    'This is the story of John Akii Bua, a trailblazer whose feats on the track echoed far beyond the finish line, ' +
    'reaching the very soul of Uganda and its Lango community.\n' +
    '\n' +
    'In the annals of Ugandan history, John Akii Bua stands tall as the nation\'s first gold medalist—a symbol of resilience, ' +
    'determination, and the power of dreams. Born a Luo and proudly belonging to the Langi tribe, Akii Bua not only ' +
    'conquered the athletic arena but also etched his name into the cultural tapestry of our people.\n' +
    '\n' +
    'As we embark on a journey to name a stadium in his honor, we celebrate not just the athlete but the man behind the records. ' +
    'This is a tale of triumph against adversity, a story that resonates with the beating heart of the Lango community.\n' +
    '\n' +
    'Join us as we explore the life, legacy, and the profound connection between John Akii Bua and the land he called home.' +
    ' Together, let\'s champion the cause to ensure that the stadium, a symbol of greatness, rises in the very soil that' +
    ' shaped this extraordinary athlete.\n' +
    '\n' +
    'Step into the world of Akii Bua, where each stride on the track was a step towards history, and where his legacy is' +
    ' destined to echo through the cheers of generations to come.\n'
