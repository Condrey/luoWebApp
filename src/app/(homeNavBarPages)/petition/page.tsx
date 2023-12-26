import HomeNavBar from "@/app/(homeComponents)/NavBar";
import Introduction from "@/app/(homeNavBarPages)/petition/(petitionComponents)/Introduction";
import ProgressPetitions, {ProgressPetitionSkeleton} from "@/components/progressPetitions";
import PetitionGrievanceCounter, {PetitionGrievanceCounterSkeleton} from "@/components/petitionGrievanceCounter";
import PetitionGrievanceButtons from "@/components/petitionGrievanceButtons";
import DominantFiguresPetitions, {
    DominantFiguresPetitionsSkeleton
} from "@/app/(homeNavBarPages)/petition/(petitionComponents)/DominantFiguresPetitions";
import PrivacyPolicySection from "@/app/(homeNavBarPages)/petition/(petitionComponents)/PrivacyPolicySection";
import {Suspense} from "react";
import SocialMediaShares from "@/app/(homeNavBarPages)/petition/(petitionComponents)/SocialMediaShares";

const PetitionPage = () => {
    return <div>
        <HomeNavBar/>
        <div className='flex flex-col md:flex-row-reverse gap-12 py-12'>
            <div className='w-full md:w-1/3 px-6 mb-6'>
                <Suspense fallback={<ProgressPetitionSkeleton/>}>
                    <ProgressPetitions/>
                </Suspense>
            </div>
            <div className='flex items-center justify-center w-full px-6'>
                <Introduction/>
            </div>
        </div>
        <div className='bg-accent md:px-2 py-12 flex flex-col items-center justify-center w-full gap-12 px-4'>
            <Suspense fallback={<PetitionGrievanceCounterSkeleton/>}><PetitionGrievanceCounter/></Suspense>
            <PetitionGrievanceButtons pathName={'/petition'}/>
            <Suspense fallback={<DominantFiguresPetitionsSkeleton/>}><DominantFiguresPetitions/></Suspense>
            <PrivacyPolicySection/>
        </div>
        <div className='flex flex-col items-center py-12'>
            <SocialMediaShares/>
        </div>


    </div>
}
export default PetitionPage
export const metadata = {
    title: `Petition`,
    description: 'Petition signatures to bid for the stadium construction in Lira'
}
