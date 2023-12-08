import {auth} from "@clerk/nextjs";
import HomeNavBar from "@/app/(homeComponents)/NavBar";
import BannerSection from "@/app/(homeComponents)/BannerSection";
import CommentSection from "@/app/(homeComponents)/CommentSection";
import IntroductionSection from "@/app/(homeComponents)/IntroductionSection";
import VideosSection from "@/app/(homeComponents)/VideosSection";

export default function Home() {
    const {userId} = auth()
    // if (userId) redirect("/notes")
    return (
        <main className="flex min-h-screen flex-col">
            <HomeNavBar/>
            <BannerSection/>
            <CommentSection/>
            <IntroductionSection/>
            <VideosSection/>

        </main>
    )
}


/*
  <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>
 */


/**
 *    An intelligent note-taking app with Ai Integration, built with OPenAi, Pinecone, Next.js, Shadcn ui,
 *                 clerk, and more.
 */
