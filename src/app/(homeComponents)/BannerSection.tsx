import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import Video from "next-video";
import SampleVideo from "../../../videos/Uganda’s unifying events; John Akii- Bua.mp4";

const BannerSection = () => {
    const videoCitation = `"Uganda’s Unifying Events; John Akii- Bua." www.youtube.com, uploaded by New Vision TV, 5 Oct. 2018, www.youtube.com/watch?v=LkOoYMZ8-jo.`
    const noOfPetitions: Number = 11145
    const noOfComments: Number = 45
    const cards: { title: String, number: Number | undefined, description: String | undefined }[] = [
        {title: 'Petitions', number: noOfPetitions, description: 'Signatures'},
        {title: 'Grievances', number: noOfComments, description: 'Posts'},
    ]
    return <div
        className="flex flex-col w-full p-2 pb-6 md:p-12 gap-5 md:gap-10 bg-gradient-to-b dark:bg-gradient-to-t from-5% from-accent text-accent-foreground"
    >
        <div className='grid  md:grid-cols-2 gap-6'>

            <div className='flex flex-col items-center text-center justify-center  gap-5 md:gap-10 '>
                    <span
                        className="text-left md:text-center font-extrabold tracking-wide text-4xl lg:text-5xl max-w-prose ">
                        No Akii Bua,&nbsp;
                        <span className='text-red-500'>No Votes,</span>
                        <br/>
                        No AFCON in Uganda.
                    </span>
                <p className='text-left md:text-center max-w-prose'>
                    {`The government's decision to place the stadium in Hoima, rather than Lira, has ignited a passionate call to action. We believe that for the Akii Bua Stadium to truly honor its namesake and resonate with the spirit of the community, it must be built in Lira.`}

                </p>
            </div>

            <div className='flex items-center justify-center  w-full h-full rounded-md  flex-col'>
                <Video
                    title={videoCitation}
                    audio={false}
                    autoPlay={true}
                    src={SampleVideo}
                    accentColor={'#020817'}
                    className='flex rounded-md'
                    poster={'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/akii_bua.jfif?alt=media&token=fa94e9b4-2bb9-4532-af6c-53148045da43'}
                    blurDataURL={'https://firebasestorage.googleapis.com/v0/b/luo-app-d2356.appspot.com/o/akii_bua.jfif?alt=media&token=fa94e9b4-2bb9-4532-af6c-53148045da43'}
                />
                <cite className='text-sm'>{videoCitation} </cite>

            </div>
        </div>
        <div className='flex flex-row gap-2 px-2 items-center justify-center'>
            {cards.map((card) => (
                <Card key={card.title.toString()}
                      className=' border-2  hover:shadow cursor-pointer px-5 bg-transparent'>
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

        <div
            className='flex flex-col md:flex-row gap-4  bg-red-200 bg-opacity-50 dark:bg-opacity-10 justify-center items-center p-4 rounded xl:rounded-full'>

            <p className='max-w-prose'>
                {`Join us in the fight for what is right. Sign the petition, share your voice, and stand with us as we declare: "No Akii Bua, No Votes, No AFCON in Uganda."`}

            </p>

            <div className='flex gap-4 justify-center'>
                <Button className='max-w-prose ' variant='default' asChild>
                    <Link href='/grievances'>
                        POST A GRIEVANCE
                        <ArrowRight/>
                    </Link>
                </Button>
                <Button className='max-w-prose' variant='destructive' asChild>
                    <Link href='/petition'>
                        SIGN THE PETITION
                        <ArrowRight/>
                    </Link>
                </Button>
            </div>
        </div>
    </div>

}
export default BannerSection
