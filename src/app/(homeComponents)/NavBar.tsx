"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {Contact, HeartHandshake, MenuIcon,} from "lucide-react";
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
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

const HomeNavBar = () => {

    return (
        <div className="sticky top-0 backdrop-blur-2xl bg-background/50 p-4   z-10 shadow dark:shadow-none">
            <div className="flex  gap-3 justify-between items-center  max-w-7xl">
                <div className=" flex-wrap gap-3 items-center hidden lg:flex">

                    <NavigationLinks/>
                </div>
                <SmallScreenSizes/>
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

function UseClassName(link: {
    link: string;
    route: string;
    routeRef: string;
    content: React.ReactNode;
}) {
    const pathName = usePathname();

    return cn(
        " flex hover:text-destructive dark:hover:text-primary uppercase ",
        pathName === link.route || pathName.startsWith(link.routeRef)
            ? "text-destructive dark:text-primary border-b-2 border-destructive dark:border-primary border-dotted"
            : "text-secondary-foreground dark:text-secondary",
    );
}

function NavigationLinks({className}: { className?: string }) {


    return <NavigationMenu className='flex flex-col lg:flex-row gap-6'>
        <div className=" justify-center items-center  ">
            <Logo/>
        </div>
        <NavigationMenuList className={cn("flex gap-1 flex-wrap", className)}>
            {homeLinks.map((link) => (
                <NavigationMenuItem key={link.link}>

                    <NavigationMenuTrigger className={cn(link.content ? 'lg:flex hidden' : 'hidden')}>
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


                    <Link href={link.route} legacyBehavior passHref
                          className=''>
                        <NavigationMenuLink
                            className={cn(link.content ? 'lg:hidden flex' : 'flex', UseClassName(link))}>
                            {link.link}
                        </NavigationMenuLink>
                    </Link>

                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>

}

function SmallScreenSizes() {
    return <Sheet>
        <SheetTrigger className='inline-flex lg:hidden'><MenuIcon/></SheetTrigger>

        <SheetContent side='left' className='space-y-6'>
            <SheetTitle>Navigation</SheetTitle>
            <NavigationLinks className={'flex-col items-start gap-4'}/>
        </SheetContent>
    </Sheet>
}
