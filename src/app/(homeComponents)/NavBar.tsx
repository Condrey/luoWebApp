"use client"
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {
    Contact,
    HeartHandshake,
    LightbulbIcon,
    LucideProps,
    MessageCircleIcon,
    TextQuoteIcon,
    VideotapeIcon,
    VoicemailIcon
} from "lucide-react";
import {cn} from "@/lib/utils";
import Logo from "@/app/(homeComponents)/Logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";


const HomeNavBar = () => {
    const {theme} = useTheme()
    const pathName = usePathname()
    const UseClassName = (link: { link: string, route: string, routeRef: string, content: React.ReactNode }) => {
        return cn(
            'flex hover:text-destructive dark:hover:text-primary uppercase ',
            pathName === link.route || pathName.startsWith(link.routeRef) ?
                'text-destructive dark:text-primary border-b-2 border-destructive dark:border-primary border-dotted'
                :
                'text-secondary-foreground dark:text-secondary'
        )
    }


    return <div className="p-4 shadow dark:shadow-none">
        <div className="flex flex-col-reverse md:flex-row gap-3 justify-between  max-w-7xl">
            <div className='flex flex-wrap gap-3 items-center'>
                <div className=' justify-center items-center  sm:max-md:flex md:hidden'>
                    <Logo/>
                </div>
                <NavigationMenu>
                    <NavigationMenuList className='flex gap-1 flex-wrap'>
                        {
                            links.map((link) => (
                                <NavigationMenuItem key={link.link}>
                                    {link.content
                                        ?
                                        <>
                                            <NavigationMenuTrigger>
                                                <Link href={link.route}>
                                                    <NavigationMenuLink className={UseClassName(link)}>
                                                        {link.link}
                                                    </NavigationMenuLink>
                                                </Link>
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className='w-full flex'>
                                                <NavigationMenuLink
                                                    className='w-full flex'>{link.content}</NavigationMenuLink>
                                            </NavigationMenuContent>
                                        </>
                                        :
                                        <Link href={link.route} legacyBehavior passHref>
                                            <NavigationMenuLink className={UseClassName(link)}>
                                                {link.link}
                                            </NavigationMenuLink>
                                        </Link>
                                    }
                                </NavigationMenuItem>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>


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


const tabs: {
    title: string,
    icon: React.ForwardRefExoticComponent<LucideProps>,
    href: string,
    listDescription: string[]
}[] = [
    {
        title: 'Chat', href: '/grievances/chat', icon: MessageCircleIcon, listDescription: [
            'A platform for visitors to share their thoughts and experiences.',
            ' Moderation features to ensure respectful and constructive discussions.',
            'Reply option for community interaction.',
        ]
    },
    {
        title: 'Video Gallery', href: '/grievances/video-gallery', icon: VideotapeIcon, listDescription: [
            ' Categorized videos expressing local grievances.',
            ' Brief descriptions for each video to provide context.',
            ' Playlists for easy navigation.'
        ]
    },
    {
        title: 'Voice Notes', href: '/grievances/voice-notes', icon: VoicemailIcon, listDescription: [
            'Audio recordings sharing personal stories and concerns.',
            'A play button for each voice note and a transcript for accessibility.'
        ]
    },
    {
        title: 'Quotations', href: '/grievances/quotations', icon: TextQuoteIcon, listDescription: [
            'Text-based speeches from community leaders and activists.',
            'Engaging quotes highlighted for impact.'
        ]
    },
    {
        title: 'Spotlight', href: '/grievances/spotlight', icon: LightbulbIcon, listDescription: [
            'Featured stories or interviews with individuals directly affected by the stadium decision.',
            'Humanize the cause by putting faces to the grievances.'
        ]
    },
]
const grievancesContent = <div className='flex flex-col md:flex-row  gap-2 p-2 md:px-4'>
    {
        tabs.map(tab => {
            const TabIcon = tab.icon;
            return (
                <Link key={tab.title} href={tab.href}>
                    <Card className=' xl:w-[250px] bg-transparent border-0 hover:bg-accent '>
                        <CardHeader className='flex flex-row md:flex-col xl:flex-row items-center'>
                            <TabIcon className=" md:flex w-10"/>
                            <CardTitle className='text-sm xl:text-2xl'>{tab.title}</CardTitle>
                        </CardHeader>
                        <CardContent className='hidden xl:block'>
                            <div>
                                <ul className='list-image-star list-inside'>
                                    {
                                        tab.listDescription.map((item, index) => (
                                            <li key={index}>
                                                {item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </CardContent>

                    </Card>
                </Link>
            )

        })
    }
</div>


const links: { link: string, route: string, routeRef: string, content: React.JSX.Element | undefined }[] = [
    {link: 'Home', route: '/', routeRef: '/home', content: undefined},
    {link: 'About', route: '/about', routeRef: '/about', content: undefined},
    {link: 'Petition', route: '/petition', routeRef: '/petition', content: undefined},
    {link: 'Grievances', route: '/grievances', routeRef: '/grievances', content: grievancesContent},
    {link: 'Merchandise', route: '/merchandise', routeRef: '/merchandise', content: undefined},
    {link: 'News', route: '/news', routeRef: '/news', content: undefined},
];
