import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const GrievancesPage = () => {
    return <div>
        <HomeNavBar/>
        Grievances
    </div>
}
export default GrievancesPage
export const metadata = {
    title: `${webPageName}: Grievances of both the young, small, great, rich and poor`
}
