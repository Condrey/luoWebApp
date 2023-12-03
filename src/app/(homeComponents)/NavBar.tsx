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
        <div className="flex flex-wrap-reverse gap-3 items-center justify-between max-w-7xl m-auto">
            <div className='flex gap-2'>
                <Link href="/" className="flex items-center gap-1">
                    <Image src={logo} alt={"Luo.com logo"} width={20} height={20}/>
                    <span className={"font-bold"}>{webPageName}</span>
                </Link>
                {
                    links.map((link) => (

                        <Button key={link.link} variant={pathName === link.route ? 'default' : 'ghost'} asChild>
                            <Link href={link.route}>
                                {(link.link).toUpperCase()}
                            </Link>
                        </Button>

                    ))
                }
            </div>

            <div className="flex items-center gap-2">
                <Button variant='ghost' asChild>
                    <Link href='/contact-us'>
                        <Contact className='pr-1'/>
                        Contact-Us
                    </Link>
                </Button>
                <Button variant='ghost' asChild>
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

}
export default HomeNavBar
