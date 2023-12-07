import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";
import Introduction from "@/app/(homeNavBarPages)/about/(aboutComponents)/Introduction";
import NamingStadium from "@/app/(homeNavBarPages)/about/(aboutComponents)/NamingStadium";


const AboutPage = () => {
    return <div>
        <div className='bg-stadium-pattern-light  dark:bg-stadium-pattern-dark bg-no-repeat bg-cover  bg-fixed '>
            <div
                className='bg-gradient-to-br from-background from-45% to-bg-background/90 w-full pb-5'>
                <HomeNavBar/>
                <Introduction/>
            </div>
        </div>
        <div className='items-center justify-center flex bg-gradient-to-b  from-slate-400/60 dark:from-accent'>
            <NamingStadium/>
        </div>
    </div>
}
export default AboutPage
export const metadata = {
    title: `${webPageName}: About the website and its purpose`
}
