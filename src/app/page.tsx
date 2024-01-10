import HomeNavBar from "@/app/(homeComponents)/NavBar";
import BannerSection from "@/app/(homeComponents)/BannerSection";
import IntroductionSection from "@/app/(homeComponents)/IntroductionSection";
import VideosSection, {
  VideosSectionSkeleton,
} from "@/app/(homeComponents)/VideosSection";
import { Suspense } from "react";
import CommentSection, {CommentSectionSkeleton} from "@/app/(homeComponents)/CommentSection";

export default function Home() {
  // if (userId) redirect("/notes")
  return (
    <main className="flex min-h-screen flex-col  pb-12">
      <HomeNavBar />
      <div className="flex flex-col gap-12">
        <BannerSection />
        <Suspense fallback={<CommentSectionSkeleton />}>
          <CommentSection />
        </Suspense>
        <IntroductionSection />
        <Suspense fallback={<VideosSectionSkeleton />}>
          <VideosSection />
        </Suspense>
      </div>
    </main>
  );
}
