import SideNav from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/SideNav";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav/>
                </div>
                <div
                    className="flex-grow   md:overflow-y-auto p-4  md:p-12  bg-accent dark:bg-background overscroll-y-none">{children}</div>
            </div>
        </div>
    );
}
