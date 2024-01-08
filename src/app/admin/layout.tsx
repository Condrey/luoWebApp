import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AdminNavLinks from "@/app/admin/admin-nav-links";
import UserToggleButton from "@/components/ui/UserToggleButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25} className="h-dvh">
        <div className="flex flex-col h-full p-4 gap-4">
          <span className="font-semibold">Navigation</span>
          <AdminNavLinks />
          <UserToggleButton />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={75}
        className="rounded-tl-xl rounded-bl-xl bg-accent"
      >
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
