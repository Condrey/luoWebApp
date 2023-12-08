'use client'
import {
    LightbulbIcon,
    LinkIcon,
    LucideProps,
    MessageCircleIcon,
    TextQuoteIcon,
    VideotapeIcon,
    VoicemailIcon,
} from 'lucide-react';
import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";


export default function NavLinks() {
    const pathName: string | undefined = usePathname()
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Button key={link.name} asChild variant='ghost'>
                        <Link
                            href={link.href}
                            className={cn(
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                pathName === link.href && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <LinkIcon className="w-6"/>
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    </Button>
                );
            })}
        </>
    );
}

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links: { name: string, href: string, icon: React.ForwardRefExoticComponent<LucideProps> } [] = [
    {name: 'Chat', href: '/grievances/chat', icon: MessageCircleIcon},
    {name: 'Video Gallery', href: '/grievances/video-gallery', icon: VideotapeIcon},
    {name: 'Voice Notes', href: '/grievances/voice-notes', icon: VoicemailIcon,},
    {name: 'Quotations', href: '/grievances/quotations', icon: TextQuoteIcon},
    {name: 'Spotlight', href: '/grievances/spotlight', icon: LightbulbIcon},
];
