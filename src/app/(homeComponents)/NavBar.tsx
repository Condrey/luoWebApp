"use client"
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo_amuka_singleton_monochrome_neutral.png";
import {UserButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {Contact, HeartHandshake} from "lucide-react";
import {webPageName} from "@/lib/constants/Constants";
import {cn} from "@/lib/utils";

const HomeNavBar = () => {
    const {theme} = useTheme()
    const pathName = usePathname()
    // About, Petition, Grievances, Merchandise, News, **Contact, and **Donate.
    const links: { link: string, route: string }[] = [
        {link: 'Home', route: '/'},
        {link: 'About', route: '/about'},
        {link: 'Petition', route: '/petition'},
        {link: 'Grievances', route: '/grievances'},
        {link: 'Merchandise', route: '/merchandise'},
        {link: 'News', route: '/news'},
    ]
    return <div className="p-4 shadow">
        <div className="flex flex-col-reverse gap-3  max-w-7xl">
            <div className='flex flex-wrap gap-3'>
                {
                    links.map((link) => (

                        <Link
                            key={link.link}
                            href={link.route}
                            className={cn(
                                'flex hover:text-destructive dark:hover:text-primary',
                                pathName === link.route ?
                                    'text-destructive dark:text-primary border-b-2 border-destructive dark:border-primary border-dotted'
                                    :
                                    'text-secondary-foreground dark:text-secondary'
                            )}
                        >
                            {(link.link).toUpperCase()}
                        </Link>

                    ))
                }
            </div>

            <div className="flex justify-between gap-2">
                <Link href="/" className="flex items-center gap-1">
                    <Image src={logo} alt={"Luo.com logo"} width={20} height={20}/>
                    <span className={"font-bold text-purple-600"}>{webPageName}</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button variant='ghost' asChild>
                        <Link href='/contact-us'>
                            <Contact className='pr-1'/>
                            Contact-Us
                        </Link>
                    </Button>
                    <Button variant='ghost' className='text-destructive dark:text-red-500' asChild>
                        <Link href='/donate'>
                            <HeartHandshake className='pr-1'/>
                            Donate
                        </Link>
                    </Button>
                    <ThemeToggleButton/>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={
                            {
                                baseTheme: theme === "dark" ? dark : undefined,
                                elements: {
                                    avatarBox: {width: "2.5rem", height: "2.5rem"}
                                }
                            }
                        }/>
                </div>

            </div>
        </div>
    </div>

}
export default HomeNavBar
