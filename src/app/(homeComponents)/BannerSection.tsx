import Video from "next-video";
import SampleVideo from "../../../videos/Uganda’s unifying events; John Akii- Bua.mp4";
import PetitionGrievanceCounter from "@/components/petitionGrievanceCounter";
import PetitionGrievanceButtons from "@/components/petitionGrievanceButtons";

const BannerSection = () => {
    const videoCitation = `"Uganda’s Unifying Events; John Akii- Bua." www.youtube.com, uploaded by New Vision TV, 5 Oct. 2018, www.youtube.com/watch?v=LkOoYMZ8-jo.`


    return <div
        className="flex flex-col w-full p-2 pb-6 md:p-12 gap-5 md:gap-10 bg-gradient-to-b dark:bg-gradient-to-t from-5% from-accent text-accent-foreground"
    >
        <div className='grid  md:grid-cols-2 gap-6'>

            <div className='flex flex-col items-center text-center justify-center  gap-5 md:gap-10 '>
                    <span
                        className="font-extrabold tracking-wide text-4xl lg:text-5xl max-w-prose xl:leading-relaxed ">
                        No Akii Bua,&nbsp;
                        <span className='text-red-500'>No Votes,</span>
                        <br/>
                        No AFCON in Uganda.
                    </span>
                <p className='text-justify md:text-center max-w-prose '>
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
        <PetitionGrievanceCounter/>
        <PetitionGrievanceButtons/>
    </div>

}
export default BannerSection
