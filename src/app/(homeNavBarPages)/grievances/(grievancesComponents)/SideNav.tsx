'use client'
import NavLinks from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/nav-links";
import Link from "next/link";
import {homeLinks} from "@/app/(homeComponents)/home-links";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {MenuIcon} from "lucide-react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import React from "react";
import UserToggleButton from "@/components/ui/UserToggleButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";


export default function SideNav() {

    return (
        <div className="flex h-full flex-row-reverse md:flex-col gap-2 md:gap-6 justify-between  px-3 py-4 md:px-2">
            <div className=" hidden md:flex  flex-col gap-1 ">
                <span className=' text-2xl font-bold  md:pb-3'>Grievances</span>
                <NavLinks/>
            </div>
            <div className="hidden md:flex flex-col gap-2 md:mb-6">
                <span className='text-2xl font-bold  md:pb-3'>Other Navigation</span>
                <OtherNavigations/>
            </div>
            <div className='flex md:hidden gap-3 justify-center items-center'>
                <ThemeToggleButton/>
                <UserToggleButton/>
            </div>
            <div className='flex md:hidden'>
                <OtherNavigationSmallScreen/>
            </div>
        </div>

    );
}

function OtherNavigations() {

    return (
        <>
            <div className='flex flex-col gap-2  justify-between pb-6'>
                <span className='text-2xl font-bold flex md:hidden md:pb-3'>Other Navigation</span>

                {
                    homeLinks.map((homeLink) => (
                        <Link href={homeLink.route} key={homeLink.route}
                              className={cn(buttonVariants({variant: 'ghost'}), 'flex  font-bold ', homeLink.content && 'hidden')}>
                            <span className='grow peer'>{homeLink.link}</span>
                            {/*<ArrowRight className='peer-hover:translate-x-2 hover:translate-x-2'/>*/}
                        </Link>
                    ))
                }
            </div>
            <hr className='py-3'/>
            <div className='hidden md:flex gap-3 justify-center items-center'>
                <ThemeToggleButton/>
                <UserToggleButton/>
            </div>
        </>
    )
}

function OtherNavigationSmallScreen() {
    return (<Sheet>
        <SheetTrigger><MenuIcon/></SheetTrigger>
        <SheetContent side='left' className=' flex-col gap-6 flex'>
            <SheetHeader>
                <SheetTitle>Grievances</SheetTitle>
            </SheetHeader>
            <div className='flex flex-col '>
                <NavLinks/>
            </div>
            <OtherNavigations/>

        </SheetContent>

    </Sheet>)

}
