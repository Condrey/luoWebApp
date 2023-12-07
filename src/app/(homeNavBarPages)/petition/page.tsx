import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";
import Introduction from "@/app/(homeNavBarPages)/petition/(petitionComponents)/Introduction";
import SocialMediaShares from "@/app/(homeNavBarPages)/petition/(petitionComponents)/SocialMediaShares";
import ProgressPetitions from "@/components/progressPetitions";
import PetitionGrievanceCounter from "@/components/petitionGrievanceCounter";
import PetitionGrievanceButtons from "@/components/petitionGrievanceButtons";
import DominantFiguresPetitions from "@/app/(homeNavBarPages)/petition/(petitionComponents)/DominantFiguresPetitions";
import PrivacyPoilicySection from "@/app/(homeNavBarPages)/petition/(petitionComponents)/PrivacyPoilicySection";

const PetitionPage = () => {
    return <div>
        <HomeNavBar/>
        <div className='flex flex-col md:flex-row-reverse'>
            <div className='w-full md:w-1/3 px-6 mb-6'>
                <ProgressPetitions/>
            </div>
            <div className='flex items-center justify-center w-full px-6'>
                <Introduction/>
            </div>
        </div>
        <div className='bg-accent md:px-2 py-4 flex flex-col items-center justify-center w-full gap-4 px-4'>
            <PetitionGrievanceCounter/>
            <PetitionGrievanceButtons/>
            <DominantFiguresPetitions/>
            <PrivacyPoilicySection/>
        </div>
        <SocialMediaShares/>


    </div>
}
export default PetitionPage
export const metadata = {
    title: `${webPageName}: Petition signatures to bid for the stadium construction in Lira`
}
