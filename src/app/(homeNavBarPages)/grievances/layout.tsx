import SideNav from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="sticky top-0 bg-background/50 z-50 backdrop-blur-2xl w-full flex-none md:w-64 dark:md:border-r ">
        <SideNav />
      </div>
      <div className="flex-grow    md:overflow-y-auto  bg-accent dark:bg-background   overscroll-y-none">
        {children}
      </div>
    </div>
  );
}
