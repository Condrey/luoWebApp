"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import NavLinks from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/nav-links";
import React, { useState } from "react";
import { OtherNavigations } from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/SideNav";

export default function OtherNavigationSmallScreen() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open}>
      <SheetTrigger onClick={() => setOpen(true)}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className=" flex-col gap-6 flex">
        <SheetHeader>
          <SheetTitle>Grievances</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col " onClick={() => setOpen(false)}>
          <NavLinks />
        </div>
        <OtherNavigations />
      </SheetContent>
    </Sheet>
  );
}
