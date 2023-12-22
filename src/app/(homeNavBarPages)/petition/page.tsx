import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";
import Introduction from "@/app/(homeNavBarPages)/petition/(petitionComponents)/Introduction";
import SocialMediaShares from "@/app/(homeNavBarPages)/petition/(petitionComponents)/SocialMediaShares";
import ProgressPetitions from "@/components/progressPetitions";
import PetitionGrievanceCounter from "@/components/petitionGrievanceCounter";
import PetitionGrievanceButtons from "@/components/petitionGrievanceButtons";
import DominantFiguresPetitions from "@/app/(homeNavBarPages)/petition/(petitionComponents)/DominantFiguresPetitions";
import PrivacyPolicySection from "@/app/(homeNavBarPages)/petition/(petitionComponents)/PrivacyPolicySection";

const PetitionPage = () => {
    return <div>
        <HomeNavBar/>
        <div className='flex flex-col md:flex-row-reverse gap-12 py-12'>
            <div className='w-full md:w-1/3 px-6 mb-6'>
                <ProgressPetitions/>
            </div>
            <div className='flex items-center justify-center w-full px-6'>
                <Introduction/>
            </div>
        </div>
        <div className='bg-accent md:px-2 py-12 flex flex-col items-center justify-center w-full gap-12 px-4'>
            <PetitionGrievanceCounter/>
            <PetitionGrievanceButtons pathName={'/petition'}/>
            <DominantFiguresPetitions/>
            <PrivacyPolicySection/>
        </div>
        <div className='flex flex-col items-center py-12'>
            <SocialMediaShares/>
        </div>


    </div>
}
export default PetitionPage
export const metadata = {
    title: `${webPageName}: Petition signatures to bid for the stadium construction in Lira`
}
