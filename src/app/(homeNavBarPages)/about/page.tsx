import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";


const AboutPage = () => {
    return <div>
        <HomeNavBar/>
        About
    </div>
}
export default AboutPage
export const metadata = {
    title: `${webPageName}: About the website and its purpose`
}
