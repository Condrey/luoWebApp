'use client'
import {UserButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {useTheme} from "next-themes";

export default function UserToggleButton() {
    const {theme} = useTheme()
    return (<UserButton
            afterSignOutUrl="/"
            appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                    avatarBox: {width: "1.8rem", height: "1.8rem"},
                },
            }}
        />
    )
}
