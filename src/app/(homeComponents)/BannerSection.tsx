import Image from "next/image";
import banner_desktop from "@/assets/akii_bua-desktop.jpg";
import banner_mobile from "@/assets/show-photo-icon-mobile.jpg";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const BannerSection = () => {
    const noOfPetitions: Number = 11145
    const noOfComments: Number = 45
    const cards: { title: String, number: Number | undefined, description: String | undefined }[] = [
        {title: 'Petitions', number: noOfPetitions, description: 'Signatures'},
        {title: 'Grievances', number: noOfComments, description: 'Posts'},
        {title: 'Merchandise', number: undefined, description: undefined},
    ]
    return <div className="grid  grid-cols-2 w-full p-2 md:p-12 gap-5 md:gap-10 bg-accent text-accent-foreground">
        <div className=' flex flex-col columns-7xl items-center text-center justify-center h-[760] gap-5 md:gap-10 '>
                    <span
                        className={"font-extrabold tracking-wide text-4xl lg:text-5xl max-w-prose "}>
                        No Akii Bua,&nbsp;
                        <span className='text-red-500'>No Votes,</span>
                        <br/>
                        No AFCON in Uganda.
                    </span>
            <p className='max-w-prose'>
                John Akii-Bua was the first Olympic champion from Uganda, who won the 400m
                hurdles at the Olympic games in Munich in 1972. Sign a petition for 2027 AFCON stadium in Lira to honor
                the achievement.
            </p>
            <div className='flex flex-row gap-2 px-2'>
                {cards.map((card) => (
                    <Card key={card.title.toString()} className=' border-2  hover:shadow cursor-pointer px-5'>
                        <CardHeader className='flex flex-col items-center'>
                            <CardTitle>{card.number?.toLocaleString()} </CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col items-center'>
                            <span>{card.title.toUpperCase()}</span>
                        </CardContent>
                    </Card>
                ))

                }            </div>

        </div>
        <div className='w-auto'>
            <Image src={banner_desktop}
                   width={1000}
                   height={760}
                   className="hidden rounded-2xl md:block"
                   alt="Image of John Akii Bua"/>
            <Image
                src={banner_mobile}
                width={560}
                height={620}
                className="block rounded md:hidden"
                alt="Image of John Akii Bua"
            />
        </div>
    </div>

}
export default BannerSection
