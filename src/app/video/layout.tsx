import React from "react";
import HomeNavBar from "@/app/(homeComponents)/NavBar";

const Layout = ({children,}: { children: React.ReactNode }) => {
    return <>
        <HomeNavBar/>
        <main className="p-4 m-auto">{children}</main>
    </>
}
export default Layout
