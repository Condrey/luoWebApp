"use client"
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {Contact, HeartHandshake} from "lucide-react";
import {cn} from "@/lib/utils";
import Logo from "@/app/(homeComponents)/Logo";

const HomeNavBar = () => {
    const {theme} = useTheme()
    const pathName = usePathname()
    // About, Petition, Grievances, Merchandise, News, **Contact, and **Donate.
    const links: { link: string, route: string, routeRef: string }[] = [
        {link: 'Home', route: '/', routeRef: '/home'},
        {link: 'About', route: '/about', routeRef: '/about'},
        {link: 'Petition', route: '/petition', routeRef: '/petition'},
        {link: 'Grievances', route: '/grievances', routeRef: '/grievances'},
        {link: 'Merchandise', route: '/merchandise', routeRef: '/merchandise'},
        {link: 'News', route: '/news', routeRef: '/news'},
    ]
    return <div className="p-4 shadow dark:shadow-none">
        <div className="flex flex-col-reverse md:flex-row gap-3 justify-between  max-w-7xl">
            <div className='flex flex-wrap gap-3 items-center'>
                <div className=' justify-center items-center  sm:max-md:flex md:hidden'>
                    <Logo/>
                </div>
                {
                    links.map((link) => (

                        <Link
                            key={link.link}
                            href={link.route}
                            className={cn(
                                'flex hover:text-destructive dark:hover:text-primary',
                                pathName === link.route || pathName.startsWith(link.routeRef) ?
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

            <div className="flex justify-end md:justify-between gap-2">
                <div className='flex justify-center items-center md:hidden'>
                    <Logo/>
                </div>

                <div className="flex items-center gap-2 ">
                    <Button variant='ghost' asChild className='hidden  md:flex'>
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
                                    avatarBox: {width: "1.8rem", height: "1.8rem"}
                                }
                            }
                        }/>
                </div>

            </div>
        </div>
    </div>

}
export default HomeNavBar
