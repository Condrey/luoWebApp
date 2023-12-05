import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const GrievancesPage = () => {
    return <div>
        <HomeNavBar/>
        Grievances
        <svg>
            <filter id='grainy'>
                <feTurbulence
                    type='turbulence'
                    baseFrequency='1'/>
            </filter>
        </svg>

        <span className='filter'>yfgiuihloip[]ohggii</span>
    </div>
}
export default GrievancesPage
export const metadata = {
    title: `${webPageName}: Grievances of both the young, small, great, rich and poor`
}
