import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const ContactUsPage = () => {
    return <div>
        <HomeNavBar/>
        Contact us
    </div>
}
export default ContactUsPage
export const metadata = {
    title: `${webPageName}: Contact us about the website through emails`
}
