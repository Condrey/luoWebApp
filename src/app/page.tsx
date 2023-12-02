import Image from "next/image";
import logo from "@/assets/logo_amuka_singleton_monochrome_neutral.png";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default function Home() {
    const {userId} = auth()
    if (userId) redirect("/notes")
    return (
        <main className="flex min-h-screen flex-col items-center  gap-5 p-24">
            <div className="flex items-center gap-4">
                <Image src={logo} alt={"Luo.com logo"} width={100} height={100}/>
                <span className={"font-extrabold tracking-tight text-4xl lg:text-5xl"}>Luo.com</span>
            </div>
            <p className={"text-center max-w-prose"}>
                An intelligent note-taking app with Ai Integration, built with OPenAi, Pinecone, Next.js, Shadcn ui,
                clerk, and more.
            </p>
            <Button asChild>
                <Link href={"/notes"}>Open</Link>
            </Button>
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
