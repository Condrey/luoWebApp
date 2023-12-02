import React from "react";
import NavBar from "@/app/notes/NavBar";

const Layout = ({children,}: { children: React.ReactNode }) => {
    return <>
        <NavBar/>
        <main className="p-4 max-w-7xl m-auto">{children}</main>
    </>
}
export default Layout
