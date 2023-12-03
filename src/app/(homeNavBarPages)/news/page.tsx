import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";

const NewsPage = () => {
    return <div>
        <HomeNavBar/>
        News
    </div>
}
export default NewsPage
export const metadata = {
    title: `${webPageName}: News for past, present, and current events, about this stadium`
}
