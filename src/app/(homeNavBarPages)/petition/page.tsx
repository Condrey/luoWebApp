import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const PetitionPage = () => {
    return <div>
        <HomeNavBar/>
        Petition
    </div>
}
export default PetitionPage
export const metadata = {
    title: `${webPageName}: Petition signatures to bid for the stadium construction in Lira`
}
