import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AdminNavLinks from "@/app/admin/admin-nav-links";
import UserToggleButton from "@/components/ui/UserToggleButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25} className="h-dvh">
        <div className="flex flex-col h-full p-4 gap-4">
          <span className="font-semibold">Navigation</span>
          <AdminNavLinks />
          <UserToggleButton />
          <ThemeToggleButton />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} className=" ">
        <div className="flex flex-col  gap-6 p-6 h-dvh  overflow-y-scroll ">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
