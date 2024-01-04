import { CardContent } from "@/components/ui/card";
import { ArrowRight, LightbulbIcon, LucideMic, LucideMic2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import featureImage from "@/assets/akii_bua-desktop.jpg";
import Breadcrumbs from "@/components/ui/bread-crumb";
import RecentDiscussions, {
  RecentDiscussionsSkeleton,
} from "@/app/(homeNavBarPages)/grievances/recent-discussions";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import ChatCard, {
  ChatCardSkeleton,
} from "@/app/(homeNavBarPages)/grievances/chat-card";
import GalleryCard, {
  GalleryCardSkeleton,
} from "@/app/(homeNavBarPages)/grievances/gallery-card";
import QuoteCard, {
  QuoteCardSkeleton,
} from "@/app/(homeNavBarPages)/grievances/quote-card";
import PopularQuoteTag, {
  PopularQuoteTagSkeleton,
} from "@/app/(homeNavBarPages)/grievances/popular-quote-tag";

const GrievancesPage = async () => {
  return (
    <main className="flex min-h-dvh flex-col gap-12 items-center p-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Grievances", href: "/grievances", active: true },
        ]}
      />
      <div
        id="first section"
        className="max-w-prose  grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-3"
      >
        <Suspense fallback={<GalleryCardSkeleton />}>
          <GalleryCard />
        </Suspense>
        <Suspense fallback={<ChatCardSkeleton />}>
          <ChatCard />
        </Suspense>
        <Suspense fallback={<QuoteCardSkeleton />}>
          <QuoteCard />
        </Suspense>{" "}
      </div>
      <Suspense fallback={<PopularQuoteTagSkeleton />}>
        <PopularQuoteTag />
      </Suspense>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/*TODO: add spotlight*/}
        {/*<div className='flex flex-col w-full xl:w-2/3'>*/}
        {/*    <SpotlightCard noOfStories={200} noOfInterviews={100}/>*/}
        {/*</div>*/}
        <div className="flex flex-col w-full  ">
          <Suspense fallback={<RecentDiscussionsSkeleton />}>
            <RecentDiscussions />
          </Suspense>
        </div>
      </div>
    </main>
  );
};
export default GrievancesPage;
export const metadata = {
  title: "Grievances",
  description: `Grievances of both the young, small, great, rich and poor`,
};

function SpotlightCard({
  noOfStories,
  noOfInterviews,
}: {
  noOfStories: number;
  noOfInterviews: number;
}) {
  const spotlight = {
    image: featureImage,
    title: "Interview with Hon. Jimmy Akena",
    id: "ldnkskn332mf",
    category: "Interview",
  };

  function ImageSection() {
    return (
      <div className="relative text-slate-50">
        <Image
          src={spotlight.image}
          alt={spotlight.title}
          width={300}
          height={120}
          className="w-full h-[300px]  xl:h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 "></div>
        <div className="absolute inset-x-0 inset-y-2 flex  justify-center">
          <span className="flex gap-1 justify-center text-xl md:text-2xl xl:text-4xl uppercase ">
            <LightbulbIcon size={48} />
            Spotlight
          </span>
        </div>

        <div className=" absolute inset-y-0 inset-x-0 flex flex-wrap p-3 gap-2 items-end justify-between">
          <span className="font-bold bg-slate-900/30 backdrop-blur-2xl break-words  rounded px-2">
            {spotlight.title}
          </span>
          <Link
            href={`/grievances/spotlight/${spotlight.id}`}
            className={cn(
              "flex gap-1 items-center",
              buttonVariants({ variant: "default" }),
            )}
          >
            {`Review ${spotlight.category}`}
            <ArrowRight className="" />
          </Link>
        </div>
      </div>
    );
  }

  function ButtonSection() {
    return (
      <CardContent className="flex flex-wrap gap-2 justify-center p-3">
        <Link
          href={"/grievances/spotlight/stories"}
          className={cn(
            "flex gap-1 items-center",
            buttonVariants({ variant: "default" }),
          )}
        >
          <span className="flex gap-1 font-bold">
            <LucideMic2 />
            Stories
          </span>
          <span>{noOfStories}</span>
        </Link>
        <Link
          href={"/grievances/spotlight/interviews"}
          className={cn(
            "flex gap-1 items-center",
            buttonVariants({ variant: "destructive" }),
          )}
        >
          <span className="flex gap-1 font-bold">
            <LucideMic />
            Interviews
          </span>
          <span>{noOfInterviews}</span>
        </Link>
      </CardContent>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-card dark:bg-accent rounded-md  border">
      <ImageSection />
      <ButtonSection />
    </div>
  );
}
