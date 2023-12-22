'use client'
import {
    LightbulbIcon,
    LinkIcon,
    LucideDroplets,
    LucideProps,
    MessageCircleIcon,
    TextQuoteIcon,
    VideotapeIcon,
} from 'lucide-react';
import React from "react";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {usePathname, useRouter,} from "next/navigation";
import {cn} from "@/lib/utils";


export default function NavLinks() {
    const pathName: string | undefined = usePathname()
    const router = useRouter()
    console.log('router is:', router)
    return (
        <div className='flex flex-row md:flex-col'>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const href = link.href
                const isActive = hasMoreThanOneSlash(href) ? pathName.startsWith(href) : pathName.endsWith(href)
                const variant = isActive ? 'default' : 'ghost'
                return (
                    <Link key={link.name}
                          href={link.href}
                          className={cn(
                              "flex  gap-2 ", buttonVariants({variant})
                          )}
                    >
                        <LinkIcon className="w-6"/>
                        <p className={cn("grow flex  ", !isActive && 'hidden md:block')}>{link.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links: { name: string, href: string, icon: React.ForwardRefExoticComponent<LucideProps> } [] = [
    {name: 'All Grievances', href: '/grievances', icon: LucideDroplets},
    {
        name: 'Video Gallery',
        href: '/grievances/video-gallery/playlist',
        icon: VideotapeIcon
    },
    {name: 'Chat', href: '/grievances/chat', icon: MessageCircleIcon},
    // {name: 'Voice Notes', href: '/grievances/voice-notes', icon: VoicemailIcon},
    {name: 'Quotations', href: '/grievances/quotations', icon: TextQuoteIcon},
    {name: 'Spotlight', href: '/grievances/spotlight', icon: LightbulbIcon},
];

export function hasMoreThanOneSlash(str: string, slashThreshold: number = 2) {
    const slashCount = (str.match(/\//g) || []).length;
    console.log(str, ' has ', slashCount, 'slashes')
    return slashCount > slashThreshold;
}
