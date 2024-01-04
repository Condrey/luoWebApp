import HomeNavBar from "@/app/(homeComponents)/NavBar";
import { webPageName } from "@/lib/constants/Constants";
import Introduction from "@/app/(homeNavBarPages)/about/(aboutComponents)/Introduction";
import NamingStadium from "@/app/(homeNavBarPages)/about/(aboutComponents)/NamingStadium";
import MediaSection from "@/app/(homeNavBarPages)/about/(aboutComponents)/MediaSection";

const AboutPage = () => {
  return (
    <div className="pb-12">
      <div className="bg-stadium-pattern-dark bg-no-repeat bg-cover  bg-fixed ">
        <div className="bg-gradient-to-tl from-background from-50% to-bg-background/90 w-full flex flex-col pb-12 gap-12">
          <HomeNavBar />
          <Introduction />
        </div>
      </div>
      <div className="items-center justify-center flex ">
        <NamingStadium />
      </div>
      <MediaSection />
    </div>
  );
};
export default AboutPage;
export const metadata = {
  title: `${webPageName}: About the website and its purpose`,
};
