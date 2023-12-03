import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const MerchandisePage = () => {
    return <div>
        <HomeNavBar/>
        Merchandise
    </div>
}
export default MerchandisePage
export const metadata = {
    title: `${webPageName}: Merchandise sales to promote products from local businesses to sell materials that picture the petition`
}
