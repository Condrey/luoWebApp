import SideNav from "@/app/(homeNavBarPages)/grievances/(grievancesComponents)/SideNav";
import NavBar from "@/app/(homeComponents)/NavBar";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar/>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav/>
                </div>
                <div
                    className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-accent dark:bg-background">{children}</div>
            </div>
        </div>
    );
}