import { auth } from "@clerk/nextjs";
import HomeNavBar from "@/app/(homeComponents)/NavBar";
import BannerSection from "@/app/(homeComponents)/BannerSection";
import CommentSection, {
  CommentSectionSkeleton,
} from "@/app/(homeComponents)/CommentSection";
import IntroductionSection from "@/app/(homeComponents)/IntroductionSection";
import VideosSection, {
  VideosSectionSkeleton,
} from "@/app/(homeComponents)/VideosSection";
import { Suspense } from "react";

export default function Home() {
  const { userId } = auth();
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
