import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const DonatePage = () => {
    return <div>
        <HomeNavBar/>
        Donate
    </div>
}
export default DonatePage
export const metadata = {
    title: `${webPageName}: Donate to the team to further and give more zeal to upcoming developments. Be a part to fund this great cause`
}
