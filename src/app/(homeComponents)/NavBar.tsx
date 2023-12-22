"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {Contact, HeartHandshake,} from "lucide-react";
import {cn} from "@/lib/utils";
import Logo from "@/app/(homeComponents)/Logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import {homeLinks} from "@/app/(homeComponents)/home-links";
import UserToggleButton from "@/components/ui/UserToggleButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const HomeNavBar = () => {
    const pathName = usePathname();
    const UseClassName = (link: {
        link: string;
        route: string;
        routeRef: string;
        content: React.ReactNode;
    }) => {
        return cn(
            " flex hover:text-destructive dark:hover:text-primary uppercase ",
            pathName === link.route || pathName.startsWith(link.routeRef)
                ? "text-destructive dark:text-primary border-b-2 border-destructive dark:border-primary border-dotted"
                : "text-secondary-foreground dark:text-secondary",
        );
    };

    return (
        <div className="sticky top-0 backdrop-blur-2xl bg-background/50 p-4   z-10 shadow dark:shadow-none">
            <div className="flex flex-col-reverse md:flex-row gap-3 justify-between  max-w-7xl">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className=" justify-center items-center  sm:max-md:flex md:hidden">
                        <Logo/>
                    </div>
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-1 flex-wrap">
                            {homeLinks.map((link) => (
                                <NavigationMenuItem key={link.link}>
                                    {link.content ? (
                                        <>
                                            <NavigationMenuTrigger>
                                                <Link href={link.route}>
                                                    <NavigationMenuLink className={UseClassName(link)}>
                                                        {link.link}
                                                    </NavigationMenuLink>
                                                </Link>
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="w-full flex">
                                                <NavigationMenuLink className="w-full flex">
                                                    {link.content}
                                                </NavigationMenuLink>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link href={link.route} legacyBehavior passHref>
                                            <NavigationMenuLink className={UseClassName(link)}>
                                                {link.link}
                                            </NavigationMenuLink>
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex justify-end md:justify-between gap-2">
                    <div className="flex justify-center items-center md:hidden">
                        <Logo/>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <Button variant="ghost" asChild className="hidden  md:flex">
                            <Link href="/contact-us">
                                <Contact className="pr-1"/>
                                Contact-Us
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-destructive dark:text-red-500"
                            asChild
                        >
                            <Link href="/donate">
                                <HeartHandshake className="pr-1"/>
                                Donate
                            </Link>
                        </Button>
                        <ThemeToggleButton/>
                        <UserToggleButton/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeNavBar;
